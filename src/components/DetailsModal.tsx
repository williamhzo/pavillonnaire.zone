/* eslint-disable @next/next/no-img-element */
import { MapboxGeoJSONFeature } from 'mapbox-gl';

type TextProps = React.PropsWithChildren<{
  className?: string;
}>;

function Text({ children, className }: TextProps) {
  return <p className={`text-center ${className}`}>{children}</p>;
}

type DetailsModalProps = React.PropsWithChildren<{
  feature: MapboxGeoJSONFeature;
}>;

const DetailsModal: React.FC<DetailsModalProps> = (props) => {
  const {
    title,
    type,
    author,
    director,
    artist,
    album,
    editor,
    year,
    place,
    image,
    abstract,
    link,
  } = props.feature.properties || {};

  function toggleAside() {
    document.getElementById('details-dialog')?.classList.add('hidden');
  }

  return (
    <aside
      id="details-dialog"
      className="absolute h-full z-50 bg-white top-0 right-0 w-full sm:w-[max(33%,350px)] hidden border border-black invert-select"
    >
      {image ? (
        <div className="w-full flex h-1/3 justify-center">
          <img src={image} alt={title} className="object-cover " />
        </div>
      ) : null}

      <div className="flex flex-col items-center py-2 px-4 gap-2">
        <button
          onClick={toggleAside}
          className="self-end p-4 text-2xl md:text-base"
        >
          &times;
        </button>

        <h3 className="font-serif text-center text-base leading-6 mb-2 ">
          {title}
        </h3>

        {type ? <Text className="italic">{type}</Text> : null}

        {author ? <Text>{author}</Text> : null}

        {director ? <Text>{director}</Text> : null}

        {artist ? <Text>{artist}</Text> : null}

        {album ? <Text>{album}</Text> : null}

        {editor ? <Text>{editor}</Text> : null}

        {year ? <Text>{year}</Text> : null}

        {place ? <Text>{place}</Text> : null}

        {abstract ? <Text>{abstract}</Text> : null}

        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            aria-hidden={true}
            className=" mt-4 hover:translate-x-2 transition-transform duration-300 p-6"
          >
            <span className="sr-only">Voir plus</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 173 27"
              className="w-20"
            >
              <path
                fill="#000"
                fillRule="evenodd"
                d="m154.943 2.722.946-1.754c2.065.898 4.03 2.337 5.91 3.713.487.357.968.71 1.443 1.047 2.384 1.69 4.695 3.075 7.269 3.392l-.088 1.269c.397.12.805.228 1.225.322l.653.147.113.66c.741 4.317-2.516 7.498-6.059 9.748-2.758 1.75-6.024 3.145-8.529 4.215a100.8 100.8 0 0 0-2.043.888l-.828-1.82c.656-.299 1.401-.617 2.202-.959 2.488-1.063 5.521-2.359 8.126-4.013 3.247-2.061 5.352-4.382 5.229-7.085a19.847 19.847 0 0 1-3.764-1.42c-13.109-.09-26.022.479-39.029 1.05-6.379.281-12.781.563-19.24.768-13.863.441-27.822.148-41.725-.145-6.43-.135-12.85-.27-19.24-.332-5.922-.057-12.016.228-18.172.515-1.783.084-3.571.167-5.362.243-7.951.336-15.932.512-23.582-.217l.19-1.992c7.504.716 15.368.546 23.308.21 1.769-.074 3.543-.157 5.317-.24 6.166-.288 12.336-.577 18.32-.519 6.44.063 12.886.198 19.33.334 13.874.292 27.743.584 41.552.144 6.407-.204 12.78-.484 19.145-.764 11.92-.524 23.811-1.046 35.829-1.064-.321-.223-.638-.45-.951-.68-.953-.701-1.888-1.443-2.817-2.18-.292-.232-.582-.463-.873-.691-1.227-.967-2.467-1.914-3.805-2.79Z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        ) : null}
      </div>
    </aside>
  );
};

export default DetailsModal;
