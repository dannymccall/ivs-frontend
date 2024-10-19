import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCredentials } from "../../utils/storage";
import "../../App.css";

export default function Header() {
  const [credentials, setCredenttials] = useState();

  useEffect(() => {
    async function fetchCredentials() {
      const credentials = await getCredentials("credentials");
      console.log(credentials);
      if (credentials !== undefined) setCredenttials(credentials);
    }

    fetchCredentials();
  }, []);
  return (
    <>
      <div className="header">
        <h6>MMS</h6>
        <nav>
          <ul>
            <li>
              <Link className="link" to="/">
                Home
              </Link>
            </li>
            {credentials && (
              <>
                {credentials.userType === "admin" && (
                  <li>
                    <Link className="link" to="/auth/dashboard">
                      Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <Link className="link" to="/auth/logout">
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}
