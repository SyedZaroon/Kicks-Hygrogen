import Button from "../ui/Button";
import Input from "../ui/Input";
import logowhite from "../../assets/images/logoWhite.png";
import footerlogo from "../../assets/images/footerLogo.png";
import { Link } from "react-router-dom";
import Icon from "../ui/Icon";
import Facebook from "../../assets/icons/social/Facebook";
import Instagram from "../../assets/icons/social/Instagram";
import Tiktok from "../../assets/icons/social/Tiktok";
import Twitter from "../../assets/icons/social/Twitter";

const Footer = () => {
  return (
    <>
      <div className="bg-(--color-blue) p-4 rounded-tr-3xl rounded-tl-3xl lg:p-10  ">
        <p className="text-3xl text-white font-semibold  ">
          Join our KicksPlus Club & get 15% off
        </p>
        <p className="mt-2 text-(--color-gray) text-sm    ">
          Join our KicksPlus Club & get 15% off
        </p>
        <div className="mt-6 flex gap-2 flex-wrap lg:flex-nowrap ">
          <Input
            type="email"
            placholder="Email Address"
            className="border-white"
            placholderClasses="placholder:text-white "
          />
          <Button variant="outline" size="small">
            SUMBMIT
          </Button>
        </div>
        <div className="my-8">
          <img src={logowhite} />
        </div>
      </div>

      <div className="bg-(--color-darkgray) p-0 -mt-5 rounded-3xl  ">
        <div className="pt-6 px-4 lg:p-10 lg:grid grid-cols-4   ">
          <div>
            <h4 className="text-(--color-yellow) text-2xl  ">About us</h4>
            <p className="text-(--color-gray)">
              We are the biggest hyperstore in the universe. We got you all
              cover with our exclusive collections and latest drops.
            </p>
          </div>

          <div className="mt-6">
            <h4 className="text-(--color-yellow) text-2xl  ">Collection</h4>
            <nav className="text-(--color-gray) mt-2 flex flex-col gap-2 ">
              <Link to="collection/all-products">All Products</Link>
              <Link to="collection/cardboard-boxes">Cardboard Boxes</Link>
              <Link to="collection/mailing-bags">Mailing Bags</Link>
              <Link to="collection/envelopes">Envelopes</Link>
              <Link to="collection/tapes">Tapes</Link>
              <Link to="collection/labels">Labels</Link>
            </nav>
          </div>

          <div className="mt-6">
            <h4 className="text-(--color-yellow) text-2xl  ">Company</h4>
            <nav className="text-(--color-gray) mt-2 flex flex-col gap-2 ">
              <Link to="/about"> About </Link>
              <Link to="/contact"> Contact </Link>
            </nav>
          </div>

          <div className="mt-6">
            <h4 className="text-(--color-yellow) text-2xl  ">Follows</h4>
            <nav className="text-(--color-gray) mt-2 flex  gap-2 ">
              <Icon variant="text">
                <Facebook color="#fff" />
              </Icon>
              <Icon variant="text">
                <Instagram color="#fff" />
              </Icon>
              <Icon variant="text">
                <Tiktok color="#fff" />
              </Icon>
              <Icon variant="text">
                <Twitter color="#fff" />
              </Icon>
            </nav>
          </div>
        </div>
        <div className="pt-10 flex justify-center items-center ">
          <img src={footerlogo} />
        </div>
      </div>
    </>
  );
};

export default Footer;
