import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeSorah,
  getAllSwar,
  getSwarStatus,
} from "../../rtk/slices/swarSlice";
import "./Fehres.scss";

const Fehres = () => {
  // selectors and dispatch
  const swar = useSelector(getAllSwar);
  const swarStatus = useSelector(getSwarStatus);
  const dispatch = useDispatch();

  return (
    <div className="fehres">
      {swarStatus === "success" && (
        <table>
          <thead>
            <tr>
              <th>رقم السورة</th>
              <th>اسم السورة</th>
              <th>رقم الصفحة</th>
              <th>نوع السورة</th>
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
      )}
    </div>
  );
};

export default Fehres;
