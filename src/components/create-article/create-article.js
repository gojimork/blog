import classes from "./create-article.module.scss";
import BlogApiService from "../../blog-api-service";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";

const CreateArticle = ({ cookies, details, success }) => {
  const history = useHistory();

  if (!cookies?.token) history.push("/");

  const [inputs, setInputs] = useState([{ value: "", id: uuidv4() }]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (details) {
      setInputs(details.tagList);
    }
  }, [details]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    mode: "onBlur",
    values: {
      title: details ? details.title : "",
      description: details ? details.description : "",
      body: details ? details.body : "",
    },
  });

  const blogApiService = new BlogApiService();

  const handleAddInput = () => {
    const newInputs = [...inputs, { value: "", id: uuidv4() }];
    setInputs(newInputs);
  };

  const handleDeleteInput = (index) => {
    const newInputs = inputs.filter(
      (input, inputIndex) => index !== inputIndex
    );
    setInputs(newInputs);
  };

  const handleChangeInputValue = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index].value = event.target.value;
    setInputs(newInputs);
  };

  const inputNodes = inputs.map((input, index) => {
    return (
      <li key={input.id} className={classes["form__tag-item"]}>
        <input
          placeholder="Tag"
          value={input.value}
          onChange={(event) => handleChangeInputValue(index, event)}
        />
        <button
          onClick={() => handleDeleteInput(index)}
          type="button"
          className={classes["form__delete-btn"]}
        >
          Delete
        </button>
        {index === inputs.length - 1 ? (
          <button
            onClick={handleAddInput}
            type="button"
            className={classes["form__add-btn"]}
          >
            Add tag
          </button>
        ) : null}
      </li>
    );
  });

  const onCreateArticleSubmit = async (article) => {
    article.tagList = inputs.map((input) => input.value);
    const body = { article: article };
    const token = cookies.token;
    try {
      setLoading(true);
      const response = await blogApiService.createArticle(body, token);
      if (response.ok) {
        const responseBody = await response.json();
        console.log("Article created successfully", responseBody);
        success();
        history.push("/");
      } else {
        const errorsObj = await response.json();
        console.log(errorsObj);
        const errors = errorsObj.errors;
        Object.keys(errors).forEach((key) => {
          setError(key, { type: "server", message: errors[key] });
        });
      }
    } catch (error) {
      console.error("Article created failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      method="post"
      className={classes["form"]}
      onSubmit={handleSubmit(onCreateArticleSubmit)}
    >
      <h2 className={classes["form__title"]}>Create new article</h2>
      <ul className={classes["input-list"]}>
        <li className={classes["input-item"]}>
          <label htmlFor="title">Title</label>
          <input
            {...register("title", {
              required: "Поле обязательное для заполнения",
            })}
            placeholder="Title"
          />
          {errors?.title && <p>{errors?.title?.message || "Error!"}</p>}
        </li>
        <li className={classes["input-item"]}>
          <label htmlFor="description">Short description</label>
          <input
            {...register("description", {
              required: "Поле обязательное для заполнения",
            })}
            placeholder="Title"
          />
          {errors?.description && (
            <p>{errors?.description?.message || "Error!"}</p>
          )}
        </li>
        <li className={classes["input-item"]}>
          <label htmlFor="body">Text</label>
          <textarea
            {...register("body", {
              required: "Поле обязательное для заполнения",
            })}
            placeholder="Text"
          />
          {errors?.body && <p>{errors?.body?.message || "Error!"}</p>}
        </li>
        <li className={classes["input-item"]}>
          <label htmlFor="tags">Tegs</label>
          <ul name="tags" className={classes["form__tag-list"]}>
            {inputNodes}
          </ul>
        </li>
      </ul>
      <button
        className={classes["submit-btn"]}
        disabled={loading}
        type="submit"
      >
        Save
      </button>
    </form>
  );
};

export default CreateArticle;
