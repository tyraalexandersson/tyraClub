import { useAppContext } from "../../context";
import { Button } from "../index";
import "./Account.style.css";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";

const Account = () => {
  const { user, username } = useAppContext();
  return (
    <main className="sectionContain">
      <div className="account">
        <h1>Account</h1>
        <p>Manage your account settings and preferences here.</p>
      </div>
      <div className="account__details">
        <div>
          <h2>Account Details</h2>
          <p>
            <strong>Username:</strong> {username}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Account Created:</strong>{" "}
            {new Date(user?.created_at).toLocaleDateString()}
          </p>
          <p>
            <strong>Last Sign In:</strong>{" "}
            {new Date(user?.last_sign_in_at).toLocaleDateString()}
          </p>
        </div>
        <div className="account__avatar">
          {user?.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url}
              alt="User Avatar"
              className="avatar"
            />
          ) : (
            <AccountBoxOutlinedIcon
              className="avatar"
              style={{
                fontSize: "100px",
                color: "#3f363c",
                margin: "0 auto",
                width: "100px",
                height: "100px",
              }}
            />
          )}
        </div>
      </div>
      <div className="account__actions_container">
        <div className="account__actions">
          <Button
            label="Update Account"
            variant="secondary"
            className="btn__update"
            onClick={() => alert("Update account")}
          />
          <Button
            label="Delete Account"
            variant="secondary"
            className="btn__delete"
            onClick={() => alert("Account deleted")}
          />
        </div>
      </div>
    </main>
  );
};
export default Account;
