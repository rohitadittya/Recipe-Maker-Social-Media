import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const UpsertRecipe = (props) => {
  const [searchParams] = useSearchParams();
  const isEdit = searchParams.get('edit');

  const [recipe, setRecipe] = useState({
    recipeName: "",
    description: "",
    ingredients: [],
    instructions: [],
    createdTimeStamp: new Date(),
    userId: null, // TODO: Get user id from context or redux store
  });

  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeForListItem = (e, index, field) => {
    const updatedList = [...recipe[field]];
    updatedList[index] = e.target.value;
    setRecipe((prevRecipe) => ({...prevRecipe, [field]: updatedList }));
  };

  const addListItem = (field) => {
    setRecipe((prevRecipe) => ({ ...prevRecipe, [field]: [...prevRecipe[field], ''] }));
  };

  const removeListItem = (e, index, field) => {
    const updatedList = [...recipe[field]];
    updatedList.splice(index, 1);
    setRecipe((prevRecipe) => ({ ...prevRecipe, [field]: updatedList }));
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    console.log("API call to create or update recipe", recipe);
  }


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-8 shadow p-4 bg-body-tertiary rounded">
          <h2>{isEdit ? "Update Recipe" : "Create Recipe"}</h2>
          <form onSubmit={handleSumbit}>
            <div className="mb-3">
              <label htmlFor="recipeName" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="recipeName"
                name="recipeName"
                value={recipe.recipeName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                rows="3"
                className="form-control"
                id="description"
                name="description"
                value={recipe.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <div className="d-flex align-items-center mb-2">
                <label className="form-label mb-0">Ingredients</label>
                <button type="button" className="btn btn-outline-primary btn-sm ms-2" onClick={() => addListItem('ingredients')}>+</button>
              </div>
              {
                recipe.ingredients.map((ingredient, ind) => (
                  <div key={ind} className="input-group mb-2">
                    <input type="text" className="form-control" value={ingredient} onChange={(e) => handleChangeForListItem(e, ind, 'ingredients')} />
                    <button type="button" className="btn btn-outline-danger" onClick={(e) => removeListItem(e, ind, 'ingredients')}>
                      &times;
                    </button>
                  </div>
                ))
              }
            </div>

            <div className="mb-3">
              <div className="d-flex align-items-center mb-2">
                <label className="form-label mb-0">Instructions</label>
                <button type="button" className="btn btn-outline-primary btn-sm ms-2" onClick={() => addListItem('instructions')}>+</button>
              </div>
              {
                recipe.instructions.map((instruction, ind) => (
                  <div key={ind} className="input-group mb-2">
                    <input type="text" className="form-control" value={instruction} onChange={(e) => handleChangeForListItem(e, ind, 'instructions')} />
                    <button type="button" className="btn btn-outline-danger" onClick={(e) => removeListItem(e, ind, 'instructions')}>
                      &times;
                    </button>
                  </div>
                ))
              }
            </div>

            <button type="submit" className="btn btn-success">
              {isEdit ? 'Update Recipe' : 'Create Recipe'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpsertRecipe;