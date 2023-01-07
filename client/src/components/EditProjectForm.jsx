import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutations";

export default function EditProjectForm({ project }) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(() => {
    switch (project.status) {
      case "Not Started":
        return "NOT_STARTED";
      case "In Progress":
        return "IN_PROGRESS";
      case "Completed":
        return "COMPLETED";
      default:
        throw new Error(`Unknown status: ${project.status}`);
    }
  });
  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    // refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
    update(cache, { data: { updateProject } }) {
      cache.writeQuery({
        query: GET_PROJECT,
        variables: { id: project.id },
        data: { project: updateProject },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || status === "" || description === "") {
      return alert("Please fill in all fields");
    }
    updateProject(project.id, name, description, status);
    setName(name);
    setDescription(description);
    setStatus(status);
  };
  return (
    <div className="mt-5">
      {console.log(status)}
      <h3>Update Project Details</h3>
      <form className="mt-3" onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Project Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Project Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Project Status
          </label>
          <select
            className="form-select"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="NOT_STARTED">Not Started</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Project
        </button>
      </form>
    </div>
  );
}
