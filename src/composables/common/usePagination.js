import { reactive, ref } from "vue";

export default function usePagination() {

  const pagination = reactive({
    total: 0,
    'page-size': 0,

  })
  const currentPage = ref(1)
  const setPagination = ({ current_page, total, per_page }) => {
    pagination.total = total
    pagination["page-size"] = per_page
    currentPage.value=current_page
  }
  return { pagination, currentPage, setPagination }

}
