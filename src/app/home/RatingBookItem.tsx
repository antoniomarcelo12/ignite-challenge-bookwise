import Image from 'next/image'
import pic from '../../assets/profile.jpeg'
import book from '../../assets/book.png'
import { Stars } from '../components/Stars'

interface RatingBookItemProps {
  isProfilePage?: boolean
}

export function RatingBookItem({ isProfilePage = false }: RatingBookItemProps) {
  return (
    <div className="bg-slate-800 w-[800px] rounded-md p-8">
      {!isProfilePage && (
        <div
          id="header"
          className="flex justify-between items-start w-full mb-8"
        >
          <div className="flex gap-4">
            <div className="w-[40px] h-[40px] overflow-hidden object-contain rounded-full border-slate-100 border-[2px]">
              <Image src={pic} width={40} height={40} alt="" />
            </div>
            <div className="">
              <h1 className="text-gray-100">Antonio Marcelo</h1>
              <p className="text-gray-400">Hoje</p>
            </div>
          </div>
          <Stars />
        </div>
      )}
      <div id="content" className="flex gap-4">
        <Image
          src={book}
          height={152}
          width={108}
          alt=""
          className="max-h-[152px]"
        />
        <div className="flex flex-col justify-around">
          <div className="mb-10">
            <h1 className="font-bold text-gray-100">O Hobbit</h1>
            <h2 className="text-gray-400 text-sm mb-4">J.R.R. Tolkien</h2>
          </div>
          {isProfilePage && <Stars />}
          {!isProfilePage && (
            <p className=" text-gray-300 max-h-[90px] line-clamp-4">
              Semper et sapien proin vitae nisi. Feugiat neque integer donec et
              aenean posuere amet ultrices. Cras fermentum id pulvinar varius
              leo a in. Amet libero pharetra nunc elementum fringilla velit
              ipsum. Sed vulputate Semper et sapien proin vitae nisi. Feugiat
              neque integer donec et aenean posuere amet ultrices. Cras
              fermentum id pulvinar varius leo a in. Amet libero pharetra nunc
              elementum fringilla velit ipsum. Sed vulputate massa velit nibh...
              Semper et sapien proin vitae nisi. Feugiat neque integer donec et
              aenean posuere amet ultrices. Cras fermentum id pulvinar varius
              leo a in. Amet libero pharetra nunc elementum fringilla velit
              ipsum. Sed vulputate massa velit nibh...
            </p>
          )}
        </div>
      </div>
      {isProfilePage && (
        <p className=" text-gray-300 mt-5 max-h-[90px] line-clamp-4 ">
          Semper et sapien proin vitae nisi. Feugiat neque integer donec et
          aenean posuere amet ultrices. Cras fermentum id pulvinar varius leo a
          in. Amet libero pharetra nunc elementum fringilla velit ipsum. Sed
          vulputate Semper et sapien proin vitae nisi. Feugiat neque integer
          donec et aenean posuere amet ultrices. Cras fermentum id pulvinar
          varius leo a in. Amet libero pharetra nunc elementum fringilla velit
          ipsum. Sed vulputate massa velit nibh... Semper et sapien proin vitae
          nisi. Feugiat neque integer donec et aenean posuere amet ultrices.
          Cras fermentum id pulvinar varius leo a in. Amet libero pharetra nunc
          elementum fringilla velit ipsum. Sed vulputate massa velit nibh...
        </p>
      )}
    </div>
  )
}
