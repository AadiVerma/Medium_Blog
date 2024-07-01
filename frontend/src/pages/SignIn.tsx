import SignUpRight from "../components/signup_part2";
import SignInLeft from "../components/signin_part1";
export default function SignIn() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <SignInLeft />
      </div>
      <div className="hidden md:block">
        <SignUpRight />
      </div>
    </div>
  );
}
