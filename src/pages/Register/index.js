import { useNavigate } from "react-router-dom";
import { setCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { checkExist, register } from "../../services/userService";
import { generalRandomString } from "../../helpers/generateToken";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    const checkExistEmail = await checkExist("email", email);

    if (checkExistEmail.length > 0) {
      alert("Email đã tồn tại");
    } else {
      const options = {
        fullName: fullName,
        email: email,
        password: password,
        token: generalRandomString()
      }

      console.log(options);

      const res = await register(options);
      if (res) {
        navigate("/login");
      } else {
        alert("Đăng ký tài khoản thất bại");
      }

    }

  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div>
          <input type="text" placeholder="Nhập họ tên" />
        </div>
        <div>
          <input type="email" placeholder="Nhập email" />
        </div>
        <div>
          <input type="password" placeholder="Nhập mật khẩu" />
        </div>
        <button type="submit">Register</button>

      </form>
    </>
  );
}

export default Register;