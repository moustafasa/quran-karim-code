import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Fehres.scss";
import {
  changeSorah,
  getAllSwar,
  getSwarError,
  getSwarStatus,
} from "../../rtk/slices/swarSlice";
import Spinner from "../../basic-components/Spinner/Spinner";

const Fehres = () => {
  // selectors and dispatch
  const swar = useSelector(getAllSwar);
  const swarStatus = useSelector(getSwarStatus);
  const swarError = useSelector(getSwarError);
  const dispatch = useDispatch();

  return (
    <div className="fehres">
      {swarStatus === "loading" ? (
        <Spinner />
      ) : swarStatus === "success" ? (
        <table>
          <thead>
            <tr>
              <th>رقم السورة</th>
              <th>اسم السورة</th>
              <th>رقم الصفحة</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {swar.map((sorah) => {
              return (
                <tr
                  key={sorah.id}
                  onClick={() => dispatch(changeSorah(sorah.id))}
                >
                  <td className="sorahId">{sorah.id}</td>
                  <td className="sorahName">{sorah.name}</td>
                  <td className="sorahPage">{sorah.start_page}</td>
                  <td>{sorah.makkia ? "مكية" : "مدنية"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        swarStatus === "error" && <div>${swarError}</div>
      )}
    </div>
  );
};

export default Fehres;
