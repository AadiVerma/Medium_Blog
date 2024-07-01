import SignUpRight from '../components/signup_part2';
import SignUpLeft from '../components/signup_part1';
export default function SignUp(){
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <SignUpLeft />
      </div>
      <div className="hidden md:block">
        <SignUpRight />
      </div>
    </div>
    )
  }