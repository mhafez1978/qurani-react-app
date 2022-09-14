import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const Content = () => {
  const [reciters, setReciters] = useState([]);
  const [activeReciterId, setActiveReciterId] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [reciterDetails, setReciterDetails] = useState(null);
  const [chapterDetails, setChapterDetails] = useState(null);
  const [chapterPages, setChapterPages] = useState([]);
  const [reciterServer, setReciterServer] = useState([]);
  let mp3Url = '';

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
  }, [reciters]);

  const handleReciterSelection = (e, reciter) => {
    const id = reciter.id;
    setActiveReciterId(id);
    setReciterDetails(reciter);
    setReciterServer(reciter.Server);
  };

  const handleChapterSelection = (e, chapter) => {
    setChapterPages(chapter.pages);
    setChapterDetails(chapter);
  };

  const fetchMp3Files = async () => {
    fetch(`${reciterServer}`)
      .then((results) => results.json())
      .then((data) => {
        console.log(data);
      });
  };
  fetchMp3Files();

  const audioLink = (reciter, number) => {
    return reciter + '/' + ('00' + number).slice(-3) + '.mp3';
  };

  return (
    <div className="content_container">
      <div className="content_overlay"></div>
      <div className="container">
        <div className="row">
          <h2 className="heading text-center">
            Select from Reciters List, then select from Chapters list. Click
            play to Listen ...Enjoy
          </h2>
          <div className="col-lg-4 col-md-12 col-sm-12">
            <h3 className="text-center custom">Step 1 : Select A Reciter</h3>

            <hr />
            <div className="custom_col">
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
                    <div className="alert alert-danger">
                      Loading Chapter Details,...
                    </div>
                    <div className="spinner-border"></div>
                  </div>
                )}
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12">
            <h3 className="text-center custom">Step 2 : Select Chapter</h3>

            <hr />
            <div className="custom_col">
              <ul>
                {reciters && chapters && chapters.length > 0 ? (
                  chapters.map((chapter) => (
                    <div key={chapter.id}>
                      <li
                        className="none"
                        value={chapter}
                        onClick={(e) => handleChapterSelection(e, chapter)}
                      >
                        <span> Chapter Number: {chapter.id}</span>
                        <br />
                        <span>Chapter Name: {chapter.name_simple}</span>
                        <br />
                        <span>Chapter Arabic Name: {chapter.name_arabic}</span>
                        <br />
                        <span>
                          Revelation Location: {chapter.revelation_place}
                        </span>
                      </li>
                      <hr />
                    </div>
                  ))
                ) : (
                  <div className="text-center">
                    <div className="text-center">Loading ...</div>
                    <div className="spinner-border"></div>
                  </div>
                )}
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12">
            <h3 className="text-center custom">Step 3 : Click Play</h3>
            <hr />
            <div className="custom_col">
              <div>
                {chapterDetails !== null && reciterDetails !== null ? (
                  <ul className="alert alert-success">
                    <li className="chapter_details">
                      You've Selected:
                      <hr />
                    </li>
                    <li className="chapter_details">
                      Chapter Number: {chapterDetails.id}
                    </li>
                    <li className="chapter_details">
                      Chapter English Name: {chapterDetails.name_simple}
                    </li>
                    <li className="chapter_details">
                      Chapter Arabic Name: {chapterDetails.name_arabic}
                      <hr />
                    </li>
                    <li className="chapter_details">
                      Reciter Name: {reciterDetails.name}
                    </li>
                    <li className="chapter_details">
                      Reciter Id: {reciterDetails.id}
                      <hr />
                    </li>
                    <li className="chapter_details">
                      Revelation Location: {chapterDetails.revelation_place}
                    </li>
                    <li className="chapter_details">
                      Revelation Order: {chapterDetails.revelation_order}
                      <br />
                    </li>
                    <li className="chapter_details">
                      Verses Count: {chapterDetails.verses_count}
                    </li>
                    <li className="chapter_details">
                      Page Number: {chapterDetails.pages[0]}
                      <hr />
                      <br />
                      <br />
                      <br />
                    </li>
                    <li className="chapter_details">
                      <ReactPlayer
                        className="react_player"
                        url={audioLink(
                          reciterDetails.Server,
                          chapterDetails.id
                        )}
                        controls={true}
                        playing={false}
                        width="200"
                        height="100px"
                      />
                      <br />
                    </li>
                  </ul>
                ) : (
                  <div className="alert alert-warning chapter_details">
                    Select a reciter from Step1, then select a Chapter from
                    Step2 to see results here ...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
