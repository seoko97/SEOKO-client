import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

const useModal = () => {
  const pathname = usePathname();
  const [isOpen, setter] = useState<boolean>(false);

  const open = () => {
    setter(true);
  };

  const close = () => {
    setter(false);
  };

  useEffect(() => {
    close();
  }, [pathname]);

  return [isOpen, open, close, setter] as const;
};

export default useModal;
