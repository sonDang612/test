import { useValidateMasterPassword } from "@/hooks/react-query/auth/useValidateMasterPassword";
import React, { Fragment } from "react";
import Button from "./Button";
import Modal from "./Modal";
import { Site } from "../../types";

type Props = {
  children: React.ReactNode;
  onClick: (value?: string) => void;
};

const AuthWrapper = (props: Props) => {
  const { children = false, onClick } = props;
  const {
    mutateAsync: validateMasterPassword,
    isPending,
    isSuccess,
  } = useValidateMasterPassword();

  const [isOpen, setIsOpen] = React.useState(false);
  const [password, setPassword] = React.useState("");

  const handleAuth = async () => {
    const data = (await validateMasterPassword({ password })) as Site;

    if (!data) return;

    setIsOpen(false);

    onClick(password);
    setPassword("");
  };

  React.useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
      setPassword("");
    }
  }, [isSuccess]);

  return (
    <Fragment>
      <div
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {children}
      </div>
      <Modal
        isOpen={isOpen}
        showHeader={false}
        onClose={() => {
          setIsOpen(false);
          setPassword("");
        }}
      >
        <div className="flex flex-row items-center gap-4 h-10">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-80 h-full"
            placeholder="Master Password"
            required
          />
          <Button
            className="h-full bg-[#4F81BD] text-white w-30"
            loading={isPending}
            onClick={handleAuth}
          >
            처리
          </Button>
        </div>
      </Modal>
    </Fragment>
  );
};

export default AuthWrapper;
