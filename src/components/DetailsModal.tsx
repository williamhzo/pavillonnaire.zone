import { MapboxGeoJSONFeature } from 'mapbox-gl';
import Image from 'next/image';

type TextProps = React.PropsWithChildren<{
  className?: string;
}>;

function Text({ children, className }: TextProps) {
  return <p className={`text-center text-sm ${className}`}>{children}</p>;
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
    link,
  } = props.feature.properties || {};

  return (
    <div
      id="details-dialog"
      className="absolute h-full z-50 bg-white top-0 right-0 w-80 hidden border border-black"
    >
      {image ? <Image src={image} alt={title} /> : null}

      <h3 className="font-serif text-center text-base leading-6 mb-2">
        {title}
      </h3>

      <Text className="italic">{type}</Text>
      <Text>{author}</Text>
      <Text>{director}</Text>
      <Text>{artist}</Text>
      <Text>{editor}</Text>
      <Text>{album}</Text>
      <Text>{year}</Text>
      <Text>{place}</Text>
      <Text>{link}</Text>
    </div>
  );
};

export default DetailsModal;
