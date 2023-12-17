import "./table.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "antd";

const InternList = () => {
  const [records, setRecords] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  const [page, setPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8000/api/interns", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setRecords(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error during profile fetch:", error);
      } };
    fetchUserProfile();
  }, []);


  const lastIndexOfPage = page * postPerPage;
  const firstIndexPage = lastIndexOfPage - postPerPage;
  const currentRecords = records.slice(firstIndexPage, lastIndexOfPage);
  const totalPages = Math.ceil(records.length / postPerPage);

  const onShowSizeChange = (current, pageSize) => {
    setpostPerPage(pageSize);
    setPage(1); // Reset to the first page when changing page size
  };


  return (
    <>
    <div className="flex justify-end">
    {userProfile && <p>Email: {userProfile.firstN}</p>}
  </div>
    <div className="min-h-screen flex items-center justify-center
    bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="table-containers" id="report-Tables">
        <table className="data-tables">
          <thead>
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Department</th>
              <th>Gpa</th>
              <th>Batch</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {currentRecords.map((item, index) => (
              <tr className="" key={index._id}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.department}</td>
                <td>{item.gpa}</td>
                <td>{item.batch}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
        <Pagination
          onChange={(page) => setPage(page)}
          pageSize={postPerPage}
          current={page}
          total={records.length}
          onShowSizeChange={onShowSizeChange}
        />
        </div>
      </div>
    </div>
    </>
  );
};

export default InternList;
