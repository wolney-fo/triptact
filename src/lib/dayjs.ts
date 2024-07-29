import dayjs from "dayjs";
import "dayjs/locale/en";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.locale("en");
dayjs.extend(LocalizedFormat);

export default dayjs;
