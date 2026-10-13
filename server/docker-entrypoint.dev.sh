#!/usr/bin/env bash
set -euo pipefail

compiler_pid=""
app_pid=""

cleanup() {
  if [[ -n "$compiler_pid" ]]; then
    kill "$compiler_pid" 2>/dev/null || true
  fi
  if [[ -n "$app_pid" ]]; then
    kill "$app_pid" 2>/dev/null || true
  fi
  wait 2>/dev/null || true
}

trap cleanup EXIT INT TERM

# Compile once before starting, then keep compiling changed sources. Spring
# Boot DevTools observes the resulting class files and restarts the app.
bash ./gradlew classes --no-daemon
bash ./gradlew classes --continuous --no-daemon &
compiler_pid=$!

bash ./gradlew bootRun --no-daemon &
app_pid=$!

wait "$app_pid"
