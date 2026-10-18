import { CheckCircle2Icon, CircleIcon } from "lucide-react";

interface PasswordIndicatorProps {
  value: string;
}

export default function PasswordIndicator({ value }: PasswordIndicatorProps) {
  const isLen = value.length >= 8;
  const isUpper = /[A-Z]/.test(value) && /[a-z]/.test(value);
  const isNum = /[0-9]/.test(value);
  const isSpecial = /[!@#$%^&*]/.test(value);

  const score = [isLen, isUpper, isNum, isSpecial].filter(Boolean).length;

  let strengthText = "";
  let strengthColor = "text-muted-foreground";
  let barColors = ["bg-muted", "bg-muted", "bg-muted"];

  if (value) {
    if (score <= 1) {
      strengthText = "약함";
      strengthColor = "text-[#e05555]";
      barColors = ["bg-[#e05555]", "bg-muted", "bg-muted"];
    } else if (score === 2 || score === 3) {
      strengthText = "보통";
      strengthColor = "text-[#f0a500]";
      barColors = ["bg-[#f0a500]", "bg-[#f0a500]", "bg-muted"];
    } else if (score === 4) {
      strengthText = "강함";
      strengthColor = "text-[#27ae60]";
      barColors = ["bg-[#27ae60]", "bg-[#27ae60]", "bg-[#27ae60]"];
    }
  }

  const requirements = [
    { label: "8자 이상", met: isLen },
    { label: "영문 대문자 포함", met: isUpper },
    { label: "숫자 포함", met: isNum },
    { label: "특수문자 포함 (!@#$%^&*)", met: isSpecial },
  ];

  return (
    <div className="w-full mt-2">
      <div className="flex gap-1.5 mt-2">
        {barColors.map((color, idx) => (
          <div
            key={idx}
            className={`flex-1 h-1 rounded-full transition-colors duration-300 ${color}`}
          />
        ))}
      </div>

      <div
        className={`text-right text-xs mt-1 font-medium min-h-4 ${strengthColor}`}
      >
        {strengthText}
      </div>

      <div className="bg-muted/50 border border-border rounded-lg p-3.5 mt-3 flex flex-col gap-2">
        {requirements.map((req, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-2 text-xs transition-colors duration-200 ${
              req.met ? "text-[#27ae60] font-medium" : "text-muted-foreground"
            }`}
          >
            {req.met ? (
              <CheckCircle2Icon className="size-3.5 stroke-[2.2]" />
            ) : (
              <CircleIcon className="size-3.5 stroke-[2.2]" />
            )}
            {req.label}
          </div>
        ))}
      </div>
    </div>
  );
}