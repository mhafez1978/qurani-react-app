import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';

const Content = () => {
  const [reciters, setReciters] = useState([]);
  const [activeReciterId, setActiveReciterId] = useState([]);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const getRecitersList = async () => {
      const {
        data: { reciters },
      } = await axios.get('https://mp3quran.net/api/_english.php');
      setReciters(reciters);
    };
    getRecitersList();
  }, []);

  useEffect(() => {
    const getChapters = async () => {
      await axios
        .get('https://api.quran.com/api/v4/chapters')
        .then((response) => {
          setChapters(response.data.chapters);
        });
    };
    reciters && reciters.length > 0 && getChapters();
  }, []);

  const handleReciterSelection = (e, reciter) => {
    const id = reciter.id;
    setActiveReciterId(id);
    console.log(activeReciterId);
  };

  return (
    <div className="content_container">
      <div className="content_overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-12 col-sm-12">
            <div className="custom_col">
              <h2 className="text-center">Reciters</h2>
              <hr />
              <ul>
                {reciters && reciters.length > 0 ? (
                  reciters.map((reciter) => (
                    <div key={reciter.id}>
                      <li
                        value={reciter.id}
                        className="none"
                        onClick={(e) => handleReciterSelection(e, reciter)}
                      >
                        <FaUserCircle />
                        {reciter.name}
                      </li>
                      <hr />
                    </div>
                  ))
                ) : (
                  <div className="text-center">
                    <div className="spinner-border"></div>
                  </div>
                )}
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12">
            <div className="custom_col">
              <h2 className="text-center">Chapters (Surats)</h2>
              <hr />
              <ul>
                {chapters && chapters.length > 0 && reciters ? (
                  chapters.map((chapter) => (
                    <li key={chapter.id}>{chapter.name_simple}</li>
                  ))
                ) : (
                  <div className="text-center">Loading ...</div>
                )}
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12">
            <div className="custom_col">
              <h2 className="text-center">Media Player</h2>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
