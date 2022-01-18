import "./singleItem.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AdminContext } from "../../Context/LoginContext";
import axios from "axios";
const baseUrl = "http://localhost:3000/server/";
// URL from sever
const imageUrl = "http://localhost:3000/images/";

// Conver URLK as an object and declare items id via useLocation
export default function AnItem() {
  // useSata to update item
  const [item, setItem] = useState({});

  // If admin is login
  const { admin, dispatch } = useContext(AdminContext);
  // {
  //   admin ? (setadmin(true)) : (setadmin(false));
  // }

  // Create useState för the items
  const [adminName, setAdmin] = useState("");
  const [address, setAddress] = useState("");
  const [town, setTown] = useState("");
  const [rent, setRent] = useState("");
  const [floor, setFloor] = useState("");
  const [room, setRoom] = useState();
  const [area, setArea] = useState("");
  const [info, setInfo] = useState("");
  const [file, setfile] = useState(null);
  const [lastDay, setLastDay] = useState();
  const [moveDate, setMoveDate] = useState();
  const [lastUpdate, setLastUpdate] = useState();

  

  const location = useLocation();
  // Id place is i the second place of pathman key
  const itemId = location.pathname.split("/")[2];

  // Update the item when id changes
  useEffect(() => {
    const getThePost = async () => {
      const res = await axios.get(`${baseUrl}items/${itemId}`);

      setItem(res.data);
      setAdmin(res.data.admin);
      setAddress(res.data.address);
      setFloor(res.data.floor);
      setTown(res.data.town);
      setRent(res.data.rent);
      setArea(res.data.area);
      setRoom(res.data.room);
      setInfo(res.data.info);
      setLastDay(res.data.lastDay);
      setMoveDate(res.data.moveDate);
      setLastUpdate(res.data.lastUpdate);
    };
    getThePost();
  }, [itemId]);
  console.log(room);

  // Delete item
  const deleteAnItem = async () => {
    try {
      await axios.delete(`${baseUrl}items/${itemId}`);
      window.location.replace(`/`);
    } catch (error) {}
  };

  // Edit item
  const toUpdate = async () => {
    try {
      await axios.put(`${baseUrl}items/${itemId}`, {
        admin: item.admin,
        address,
        town,
        info,
        floor,
        rent,
        room,
        area,
      });
      window.location.reload();
    } catch (error) {}
    console.log(area);
  };
  return (
    <article className="singleItem itemWidth item">
      <div className="itemImg">
        <img src={imageUrl + item.image} alt="" />
      </div>
      <div className="itemTitle">
        <h4 className="title">{item.address}</h4>

        {/* If admin is login show edit and delete function */}
        {admin && (
          <div className="adminTools">
            {/*  */}
            <a href="">
              {/* Delete the item */}
              <i onClick={deleteAnItem} className="fas trash">
                
              </i>
            </a>
          </div>
        )}
      </div>
      <div className="itemTitle singleInfo">
        <div className="itemCreator">
          <p className="creator">
            <strong>Skapat av:</strong> {adminName}
          </p>

          <p className="date">
            <strong>Datum: </strong>
            {new Date(item.createdAt).toDateString()}
          </p>
        </div>
        <div className="itemTitle">
          {/* TO EDITE */}
          {admin ? (
            <input
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              value={address}
              className="updateX"
            />
          ) : (
            <h4 className="title">{item.address}</h4>
          )}
          {/* TO EDITE */}
          {admin ? (
            <input
              onChange={(e) => setTown(e.target.value)}
              type="text"
              value={town}
              className="updateX"
            />
          ) : (
            <h4 className="town">{item.town}</h4>
          )}
        </div>
        <div className="itemInfo addDate">
          <strong className="strong">PUBLICERAD/UPDATERAD</strong>

          <p className="info">{new Date(item.updatedAt).toDateString()}</p>
        </div>
        <div className="itemInfo floor">
          <strong className="strong">VÅN</strong>
          {/* TO EDITE */}
          {admin ? (
            <input
              onChange={(e) => setFloor(e.target.value)}
              type="number"
              value={floor}
            />
          ) : (
            <p className="info">{item.floor}</p>
          )}
        </div>
        <div className="itemInfo floor">
          <strong className="strong">HYRA</strong>
          {/* TO EDITE */}
          {admin ? (
            <input
              onChange={(e) => setRent(e.target.value)}
              type="number"
              value={rent}
            />
          ) : (
            <p className="info">{item.rent} kr/månader</p>
          )}
        </div>
        <div className="itemInfo room">
          <strong className="strong">RUM</strong>
          {/* TO EDITE */}
          {admin ? (
            <input
              onChange={(e) => setRoom(e.target.value)}
              type="number"
              value={room}
            />
          ) : (
            <p className="info">{item.room}</p>
          )}
        </div>
        <div className="itemInfo area">
          <strong className="strong">YTA</strong>
          {/* TO EDITE */}
          {admin ? (
            <input
              onChange={(e) => setArea(e.target.value)}
              type="number"
              value={area}
            />
          ) : (
            <p className="info">{item.area} m²</p>
          )}
        </div>

        {admin ? (
          <textarea
            placeholder="Information om lägenheten..."
            className="textArea textAreaX"
            type="text"
            cols="30"
            rows="20"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          ></textarea>
        ) : (
          <p className="itemInfo">{item.info}</p>
        )}
      </div>
      {/* TO EDITE */}
      {admin ? (
        <button onClick={toUpdate} className="itemAccept bgGreen btn">
          {" "}
          Uppdatera
        </button>
      ) : (
        <a className="itemAccept bgGreen btn">ANMÄLLA</a>
      )}
    </article>
  );
}
