import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";

const PasswordInput = ({ value, onChange, ...props }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input {...props} value={value} onChange={onChange} type={show ? "text" : "password"} />

      <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2">
        {show ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
      </button>
    </div>
  );
};

export default PasswordInput;
