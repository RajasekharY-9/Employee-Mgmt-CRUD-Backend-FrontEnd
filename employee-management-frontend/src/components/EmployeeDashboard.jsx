import React, { useEffect, useState } from "react";
import axios from "axios";

function EmployeeDashboard({ auth }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [newEmployee, setNewEmployee] = useState({ name: "", address: "" });
  const [editEmployee, setEditEmployee] = useState(null);

  const API_URL = "http://localhost:8080/api/employees";

  // Fetch all employees (READ)
  const loadEmployees = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: auth },
      });

      // ✅ ensure it's always an array
      const data = Array.isArray(res.data) ? res.data : [];

      if (data.length === 0) {
        //setMessage("Employees not found");
      } else {
        setMessage("");
      }
      setEmployees(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setEmployees([]); // prevent map crash
      setMessage("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, [auth]);

  // Add Employee (CREATE)
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, newEmployee, {
        headers: { Authorization: auth },
      });
      setNewEmployee({ name: "", address: "" });
      loadEmployees();
    } catch (err) {
      alert("Failed to add employee");
    }
  };

  // Update Employee (UPDATE)
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${editEmployee.id}`, editEmployee, {
        headers: { Authorization: auth },
      });
      setEditEmployee(null);
      loadEmployees();
    } catch (err) {
      alert("Failed to update employee");
    }
  };

  // Delete Employee (DELETE)
  const handleDelete = async (name) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`${API_URL}/${name}`, {
          headers: { Authorization: auth },
        });
        loadEmployees();
      } catch (err) {
        alert("Failed to delete employee");
      }
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading employees...</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#00796b" }}>
        Employee Dashboard
      </h2>
      {message && <p style={{ color: "red", textAlign: "center" }}>{message}</p>}

      {/* Add / Update Employee Form */}
      <form
        onSubmit={editEmployee ? handleUpdate : handleAdd}
        style={{
          display: "flex",
          gap: "10px",
          margin: "20px auto",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={editEmployee ? editEmployee.name : newEmployee.name}
          onChange={(e) =>
            editEmployee
              ? setEditEmployee({ ...editEmployee, name: e.target.value })
              : setNewEmployee({ ...newEmployee, name: e.target.value })
          }
          required
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />
        <input
          type="text"
          placeholder="Address"
          value={editEmployee ? editEmployee.address : newEmployee.address}
          onChange={(e) =>
            editEmployee
              ? setEditEmployee({ ...editEmployee, address: e.target.value })
              : setNewEmployee({ ...newEmployee, address: e.target.value })
          }
          required
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 12px",
            border: "none",
            borderRadius: "6px",
            backgroundColor: "#00796b",
            color: "white",
            cursor: "pointer",
          }}
        >
          {editEmployee ? "Update" : "Add"}
        </button>
        {editEmployee && (
          <button
            type="button"
            onClick={() => setEditEmployee(null)}
            style={{
              padding: "8px 12px",
              border: "none",
              borderRadius: "6px",
              backgroundColor: "#ccc",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Employee Table */}
      <table
        style={{
          borderCollapse: "collapse",
          width: "80%",
          margin: "0 auto",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#00796b", color: "white" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>ID</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Address</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp, index) => (
              <tr
                key={emp.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                }}
              >
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {emp.id}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {emp.name}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {emp.address}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  <button
                    onClick={() => setEditEmployee(emp)}
                    style={{
                      padding: "6px 10px",
                      marginRight: "8px",
                      border: "none",
                      borderRadius: "6px",
                      backgroundColor: "#0288d1",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(emp.name)}
                    style={{
                      padding: "6px 10px",
                      border: "none",
                      borderRadius: "6px",
                      backgroundColor: "#d32f2f",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "10px" }}>
                No employees available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeDashboard;
