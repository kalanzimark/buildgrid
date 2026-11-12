import { useForm } from "react-hook-form";

export default function DigForm({ onFormSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  return (
    <form className="dig-form" onSubmit={handleSubmit(onFormSubmit)}>
      <h3>New dig</h3>

      <label>
        Purpose
        <input
          type="text"
          {...register("purpose", { required: "Purpose is required" })}
        />
      </label>
      {errors.purpose && (
        <p className="dig-form__error">{errors.purpose.message}</p>
      )}

      <label>
        Start date
        <input
          type="date"
          {...register("start", { required: "Start date is required" })}
        />
      </label>
      {errors.start && (
        <p className="dig-form__error">{errors.start.message}</p>
      )}

      <label>
        End date
        <input
          type="date"
          {...register("end", {
            required: "End date is required",
            validate: (value) =>
              value >= getValues("start") ||
              "End date must be on or after the start date",
          })}
        />
      </label>
      {errors.end && <p className="dig-form__error">{errors.end.message}</p>}

      <div className="dig-form__buttons">
        <button type="submit">Save dig</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
