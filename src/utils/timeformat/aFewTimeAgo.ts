import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

export const aFewTimeAgo = (targetTime :string) => {

  dayjs.extend(relativeTime);
  dayjs.locale('ko');
  return dayjs(Number(targetTime)-1000).fromNow()

}