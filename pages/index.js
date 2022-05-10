import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { getData } from "../utils/fetch";
import { AiOutlineRight } from "react-icons/ai";

const Index = () => {
  const [allDataStudentsInfo, setAllDataStudentsInfo] = useState({});
  const [allDataStudentsOrdes, setAllDataStudentsOrders] = useState([]);
  const [checkedStatus, setCheckedStatus] = useState({
    due: false,
    outstanding: false,
  });
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const getAllData = async () => {
      try {
        setLoading(true);
        const dataStudentsInfo = await getData(
          "students/3b35fb50-3d5e-41b3-96d6-c5566141fab0/"
        );
        const dataStudentsOrders = await getData(
          "students/3b35fb50-3d5e-41b3-96d6-c5566141fab0/orders"
        );
        const dataAddIsChecked = dataStudentsOrders.map((item) => ({
          ...item,
          isChecked: false,
        }));
        setAllDataStudentsInfo(dataStudentsInfo);
        setAllDataStudentsOrders(dataAddIsChecked);
        setLoading(false);
      } catch (error) {
        alert("No se pudo acceder a la API ya que es not secure URL HTTP");
      }
    };
    getAllData();
  }, []);

  const handleAddTotal = (id) => {
    const newArray = allDataStudentsOrdes.map((item) => {
      item =
        item.id == id ? { ...item, isChecked: !item.isChecked } : { ...item };
      return item;
    });
    setAllDataStudentsOrders(newArray);
    const getElement = allDataStudentsOrdes.find((item) => item.id == id);
    setTotal(
      !getElement.isChecked
        ? parseFloat(
            parseFloat(total) +
              parseFloat(getElement.price) +
              parseFloat(getElement.interest ? getElement.interest : 0)
          ).toFixed(2)
        : parseFloat(
            parseFloat(total) -
              parseFloat(getElement.price) -
              parseFloat(getElement.interest ? getElement.interest : 0)
          ).toFixed(2)
    );
  };

  const handleSelectAll = (status) => {
    const newArray = allDataStudentsOrdes.map((item) => {
      item =
        item.status.toLowerCase() == status
          ? { ...item, isChecked: !checkedStatus[status] ? true : false }
          : { ...item };
      return item;
    });

    setAllDataStudentsOrders(newArray);
    setCheckedStatus({ ...checkedStatus, [status]: !checkedStatus[status] });
    setTotal(
      newArray.reduce(
        (acc, item) =>
          item.isChecked
            ? parseFloat(acc) +
              parseFloat(item.price) +
              parseFloat(item.interest ? item.interest : 0)
            : acc,
        0
      )
    );
  };

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto">
      <Header
        nameCollege={
          allDataStudentsInfo.school && allDataStudentsInfo.school.name
        }
      />
      {loading ? (
        <p className="flex justify-center items-center">Cargando...</p>
      ) : (
        <div className="flex flex-col gap-3 mx-2">
          <div className="flex flex-col gap-3 bg-white p-3 rounded-lg">
            <div className="flex justify-between">
              <p>
                {allDataStudentsInfo.first_name} {allDataStudentsInfo.last_name}
              </p>
              <p>{allDataStudentsInfo.cohort}</p>
            </div>
            <div className="flex justify-between font-bold">
              <p>Total a Pagar</p>
              <p>$ {total}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 bg-white p-3">
            <details>
              <summary className="cursor-pointer font-semibold">
                Cuotas pagadas
              </summary>
              {allDataStudentsOrdes.map(
                (item) =>
                  item.status == "PAID" && (
                    <div className="flex justify-between pt-3" key={item.id}>
                      <div className="flex flex-col gap-3">
                        <p>{item.name}</p>
                        <p className="text-xs">
                          Pagado el: {item.payin.created.substring(0, 10)}
                        </p>
                      </div>
                      <div className="flex gap-3 text-right items-center cursor-pointer">
                        <div className="flex flex-col gap-3 text-2xl">
                          <AiOutlineRight className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  )
              )}
            </details>
          </div>
          <div className="flex flex-col gap-3 bg-white p-3">
            <details>
              <summary className="cursor-pointer font-semibold">
                Cuotas Pendientes
              </summary>
              <div className="flex gap-3 justify-end">
                <p>Seleccionar todas</p>
                <div className="flex flex-col gap-3 text-2xl">
                  <input
                    type="checkbox"
                    checked={checkedStatus.due}
                    className="w-8 h-8 accent-black"
                    onChange={() => handleSelectAll("due")}
                  />
                </div>
              </div>
              {allDataStudentsOrdes.map(
                (item) =>
                  item.status == "DUE" && (
                    <div className="flex justify-between pt-3" key={item.id}>
                      <div className="flex flex-col gap-3">
                        <p>{item.name}</p>
                        <p className="text-xs">Fehca vencimiento: {item.due}</p>
                      </div>
                      <div className="flex gap-3 text-right items-center">
                        <div className="flex flex-col gap-3">
                          <p>$ {item.price}</p>
                          <p className="text-xs">
                            Interés: $ {item.interest > 0 ? item.interest : 0}
                          </p>
                        </div>
                        <div className="flex flex-col gap-3 text-2xl">
                          <input
                            type="checkbox"
                            checked={item.isChecked}
                            className="w-8 h-8 accent-black"
                            onChange={() => handleAddTotal(item.id)}
                          />
                        </div>
                      </div>
                    </div>
                  )
              )}
            </details>
          </div>

          <div className="flex flex-col gap-3 bg-white p-3">
            <details>
              <summary className="cursor-pointer font-semibold">
                Cuotas Futuras
              </summary>
              <div className="flex gap-3 justify-end">
                <p>Seleccionar todas</p>
                <div className="flex flex-col gap-3 text-2xl">
                  <input
                    type="checkbox"
                    checked={checkedStatus.outstanding}
                    className="w-8 h-8 accent-black"
                    onChange={() => handleSelectAll("outstanding")}
                  />
                </div>
              </div>
              {allDataStudentsOrdes.map(
                (item) =>
                  item.status == "OUTSTANDING" && (
                    <div className="flex justify-between pt-3" key={item.id}>
                      <div className="flex flex-col gap-3">
                        <p>{item.name}</p>
                        <p className="text-xs">Fehca vencimiento: {item.due}</p>
                      </div>
                      <div className="flex gap-3 text-right items-center">
                        <div className="flex flex-col gap-3">
                          <p>$ {item.price}</p>
                          <p className="text-xs">
                            Interés: $ {item.interest > 0 ? item.interest : 0}
                          </p>
                        </div>
                        <div className="flex flex-col gap-3 text-2xl">
                          <input
                            type="checkbox"
                            checked={item.isChecked}
                            className="w-8 h-8 accent-black"
                            onChange={() => handleAddTotal(item.id)}
                          />
                        </div>
                      </div>
                    </div>
                  )
              )}
            </details>
          </div>
          {parseFloat(total) > 0 && (
            <button className="bg-gray-600 text-white p-3 px-5 rounded-2xl uppercase">
              Ir a pagar
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
