import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../hooks/useFetch";
import Word from "./Word";
export default function Day() {
  const { day } = useParams();
  const days = useFetch("http://localhost:3001/days");
  const words = useFetch(`http://localhost:3001/words?day=${day}`);
  return (
    <>
      <h2>
        <Link to={day > 1 ? `${day - 1}` : `${day}`}>&lt;</Link>
        Day {day}
        <Link to={day < days.length ? `${parseInt(day) + 1}` : `${day}`}>
          &gt;
        </Link>
      </h2>
      {words.length === 0 && <span>Loading...</span>}
      <table>
        <tbody>
          {words.map((word) => (
            <Word word={word} key={word.id} />
          ))}
        </tbody>
      </table>
    </>
  );
}
