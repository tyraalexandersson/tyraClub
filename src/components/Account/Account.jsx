import { useAppContext } from "../../context";
import { Button } from "../index";
import "./Account.style.css";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";

const Account = () => {
  const { user, username } = useAppContext();

  const handleAddImg = () => {
    alert("Add image");
  };
  return (
    <main className="sectionContain">
      <div className="account">
        <h1>ClubKonto</h1>
        <p>Hantera ditt Club konto här!</p>
      </div>
      <div className="account__details">
        <div>
          <h2>Konto detaljer</h2>
          <p>
            <strong>Användarnamn:</strong> {username}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Konto skapat:</strong>{" "}
            {new Date(user?.created_at).toLocaleDateString()}
          </p>
          <p>
            <strong>Senast inloggad:</strong>{" "}
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
            <>
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
              <Button
                className="mockBtn"
                type="button"
                variant={"secondary"}
                label="Lägg till bild"
                onClick={handleAddImg}
              />
            </>
          )}
        </div>
      </div>
      <div className="account__actions_container">
        <div className="account__actions">
          <Button
            label="Uppdatera konto"
            variant="secondary"
            className="btn__update"
            onClick={() => alert("Update account")}
          />
          <Button
            label="Ta bort konto"
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
