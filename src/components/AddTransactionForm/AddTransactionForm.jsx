import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { addTransactionThunk } from "../../store/finance/financeOperations.js";
import { selectCategories } from "../../store/finance/financeSelectors.js";
import { closeAddTransactionModal } from "../../store/global/globalSlice.js";
import { toApiDate } from "../../utils/formatters.js";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown.jsx";
import Icon from "../Icon/Icon.jsx";
import css from "./AddTransactionForm.module.css";
import * as yup from "yup";

const schema = yup.object({
  type: yup.string().oneOf(["INCOME", "EXPENSE"]).required(),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be positive")
    .required("Amount is required"),
  transactionDate: yup.date().typeError("Invalid date").required("Date is required"),
  categoryId: yup.string().when("type", {
    is: "EXPENSE",
    then: (s) => s.required("Category is required"),
    otherwise: (s) => s.notRequired(),
  }),
  comment: yup.string().max(500).default(""),
});

export default function AddTransactionForm() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const expenseCategories = categories.filter((c) => c.type === "EXPENSE");
  const incomeCategory = categories.find((c) => c.type === "INCOME");

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      type: "EXPENSE",
      amount: "",
      transactionDate: new Date(),
      categoryId: "",
      comment: "",
    },
    resolver: yupResolver(schema),
  });

  const type = watch("type");
  const isIncome = type === "INCOME";

  const handleToggle = (newType) => {
    setValue("type", newType, { shouldValidate: true });
    if (newType === "INCOME" && incomeCategory) {
      setValue("categoryId", incomeCategory.id);
    } else {
      setValue("categoryId", "");
    }
  };

  const onSubmit = async (values) => {
    try {
      const payload = {
        transactionDate: toApiDate(values.transactionDate),
        type: values.type,
        categoryId: isIncome ? (incomeCategory?.id ?? values.categoryId) : values.categoryId,
        comment: values.comment || "",
        amount: isIncome ? Number(values.amount) : -Number(values.amount),
      };
      await dispatch(addTransactionThunk(payload)).unwrap();
      toast.success("Transaction added!");
      dispatch(closeAddTransactionModal());
    } catch (err) {
      toast.error(err || "Could not add transaction");
    }
  };

  const handleCancel = () => dispatch(closeAddTransactionModal());

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className={css.title}>Add transaction</h2>

      <div className={css.toggle}>
        <button
          type='button'
          className={[
            css["toggle-btn"],
            !isIncome && css["toggle-btn--active"],
            !isIncome && css["toggle-btn--expense"],
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => handleToggle("EXPENSE")}
        >
          Expense
        </button>
        <div className={css["toggle-switch"]} aria-hidden='true'>
          <span
            className={[css["toggle-knob"], isIncome ? css["toggle-knob--income"] : css["toggle-knob--expense"]]
              .filter(Boolean)
              .join(" ")}
          />
        </div>
        <button
          type='button'
          className={[css["toggle-btn"], isIncome && css["toggle-btn--active"], isIncome && css["toggle-btn--income"]]
            .filter(Boolean)
            .join(" ")}
          onClick={() => handleToggle("INCOME")}
        >
          Income
        </button>
      </div>

      {!isIncome && (
        <div className={css.field}>
          <Controller
            control={control}
            name='categoryId'
            render={({ field }) => (
              <CategoryDropdown
                value={field.value}
                onChange={field.onChange}
                options={expenseCategories.map((c) => ({ value: c.id, label: c.name }))}
                placeholder='Select a category'
                error={!!errors.categoryId}
              />
            )}
          />
          {errors.categoryId && (
            <p className={css.error} aria-live='polite'>
              {errors.categoryId.message}
            </p>
          )}
        </div>
      )}

      <div className={css.row}>
        <div className={css.field}>
          <input
            className={[css.input, errors.amount && css["input--error"]].filter(Boolean).join(" ")}
            type='number'
            step='0.01'
            placeholder='0.00'
            {...register("amount")}
          />
          {errors.amount && (
            <p className={css.error} aria-live='polite'>
              {errors.amount.message}
            </p>
          )}
        </div>

        <div className={css.field}>
          <Controller
            control={control}
            name='transactionDate'
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={field.onChange}
                dateFormat='dd.MM.yyyy'
                maxDate={new Date()}
                className={[css.input, css.datepicker, errors.transactionDate && css["input--error"]]
                  .filter(Boolean)
                  .join(" ")}
                wrapperClassName={css["datepicker-wrapper"]}
                calendarClassName={css.calendar}
                placeholderText='DD.MM.YYYY'
              />
            )}
          />
          <Icon name='calendar' className={css["calendar-icon"]} width={18} height={18} />
          {errors.transactionDate && (
            <p className={css.error} aria-live='polite'>
              {errors.transactionDate.message}
            </p>
          )}
        </div>
      </div>

      <div className={css.field}>
        <Icon name='comment' className={css["field-icon"]} width={18} height={18} />
        <input
          className={[css.input, css["input--comment"]].join(" ")}
          type='text'
          placeholder='Comment'
          {...register("comment")}
        />
      </div>

      <div className={css.actions}>
        <button className={css.submit} type='submit' disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "ADD"}
        </button>
        <button className={css.cancel} type='button' onClick={handleCancel}>
          CANCEL
        </button>
      </div>
    </form>
  );
}
