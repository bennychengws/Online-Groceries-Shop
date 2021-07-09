
import Signup from "../components/Signup.jsx";
import Layout from "../components/Layout.jsx";
import Image from "next/image";
import carrotImage from "../images/Group.png";
import moduleCss from "../styles/signupPage.module.css";

const signup = () => {
  return (
    <Layout>
      <div className={moduleCss.container}>
        <div className={moduleCss.image}>
          <Image src={carrotImage} width="30vw" height="40vh"></Image>
        </div>
        <Signup />
      </div>
    </Layout>
  );
};

export default signup;
