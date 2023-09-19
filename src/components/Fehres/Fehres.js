import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Fehres.scss";
import { changeSorah, getAllSwar } from "../../rtk/slices/swarSlice";

const Fehres = () => {
  const swar = useSelector(getAllSwar);
  const dispatch = useDispatch();

  return (
    <div className="fehres">
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
    </div>
  );
};

export default Fehres;
