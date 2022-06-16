import Link from "next/link";
import { useRouter } from "next/router";
import Seo from "../components/Seo";

const API_KEY = "10923b261ba94d897ac6b81148314a3f";

export default function Home({ results }) {
  const router = useRouter();
  const onClick = (id, title) => {
    router.push(`/movies/${title}/${id}`);
  };
  return (
    <div className="container">
      <Seo title="home" />
      {!results && <h4>Loading...</h4>}
      {results?.map((movie) => (
        <div
          onClick={() => onClick(movie.id, movie.original_title)}
          className="movie"
          key={movie.id}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <h4>
            <Link href={`/movies/${movie.id}`}>
              <a>{movie.original_title}</a>
            </Link>
          </h4>
        </div>
      ))}

      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

//이걸 추가하면 데이터가 들어오기 전까지 프론트에 아무것도 보이지 않음(로딩 없이 사이트 만드는 것, html 작성시부터 데이터를 불러와서 붙이기 때문)
//데이터 오기 전에 로딩(데이터 제외한 html을)으로 보여주고, html 먼저 보여주려면 useeffect에서 fetch 수행
export async function getServerSideProps() {
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();
  return {
    props: {
      results,
    },
  };
}
