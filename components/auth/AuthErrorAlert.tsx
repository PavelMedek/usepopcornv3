type AuthErrorAlertProps = {
  message?: string;
};

export default function AuthErrorAlert({ message }: AuthErrorAlertProps) {
  if (!message) return null;

  return (
    <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-200">
      {message}
    </div>
  );
}
