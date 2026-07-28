import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { editTransactionThunk } from "../../store/finance/financeOperations.js";
import { selectCategories } from "../../store/finance/financeSelectors.js";
import { closeEditTransactionModal } from "../../store/global/globalSlice.js";
import { toApiDate } from "../../utils/formatters.js";
import Icon from "../Icon/Icon.jsx";
import css from "./EditTransactionForm.module.css";
import * as yup from "yup";

const schema = yup.object({
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be positive")
    .required("Amount is required"),
  transactionDate: yup.date().typeError("Invalid date").required("Date is required"),
  comment: yup.string().max(500).default(""),
});

export default function EditTransactionForm({ transaction }) {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const isIncome = transaction.type === "INCOME" || transaction.type === "+";
  const categoryName = categories.find((c) => c.id === transaction.categoryId)?.name ?? transaction.categoryId ?? "—";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      amount: Math.abs(transaction.amount ?? 0),
      transactionDate: transaction.transactionDate ? new Date(transaction.transactionDate) : new Date(),
      comment: transaction.comment ?? "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    try {
      const payload = {
        transactionDate: toApiDate(values.transactionDate),
        categoryId: transaction.categoryId,
        comment: values.comment || "",
        amount: isIncome ? Number(values.amount) : -Number(values.amount),
      };
      await dispatch(editTransactionThunk({ id: transaction.id, data: payload })).unwrap();
      toast.success("Transaction updated!");
      dispatch(closeEditTransactionModal());
    } catch (err) {
      toast.error(err || "Could not update transaction");
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className={css.title}>Edit transaction</h2>

      <div className={css["type-badge"]}>
        <span
          className={[css["type-label"], isIncome ? css["type-label-income"] : css["type-label-expense"]]
            .filter(Boolean)
            .join(" ")}
        >
          {isIncome ? "Income" : "Expense"}
        </span>
        <span className={css["category-label"]}>{categoryName}</span>
      </div>

      <div className={css.row}>
        <div className={css.field}>
          <input
            className={[css.input, errors.amount && css["input-error"]].filter(Boolean).join(" ")}
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
                className={[css.input, css.datepicker, errors.transactionDate && css["input-error"]]
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
          className={[css.input, css["input-comment"]].join(" ")}
          type='text'
          placeholder='Comment'
          {...register("comment")}
        />
      </div>

      <div className={css.actions}>
        <button className={css.submit} type='submit' disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "SAVE"}
        </button>
        <button className={css.cancel} type='button' onClick={() => dispatch(closeEditTransactionModal())}>
          CANCEL
        </button>
      </div>
    </form>
  );
}
