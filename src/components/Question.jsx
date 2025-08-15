import { useState } from "react";

function Question() {
  const questions = [
    { id: 1, question: "Herhangi bir psikolojik rahatsızlığın var mı?" },
    { id: 2, question: "Hiç sinir patlaması yaşadın mı?" },
    { id: 3, question: "Sabıka kaydın var mı?" },
    { id: 4, question: "Babandan nefret ediyor musun?" },
  ];

  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [missingAnswers, setMissingAnswers] = useState([]);

  const handleAnswer = (id, value) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const totalScore = Object.values(answers).reduce(
    (acc, val) => acc + (val === "Evet" ? 25 : 0),
    0
  );

  const getResult = () => {
    if (totalScore === 0) {
      return (
        <div>
          <p className="text-xl mb-4">
            Kardeşim hiçbir sikin yok. İlk görev, psikolojini boz!
          </p>
          <video src="/sansar-0.mp4" controls autoPlay />
        </div>
      );
    } else if (totalScore === 25) {
      return (
        <div>
          <p className="text-xl mb-4">
            İyi bir başlangıç. Kafayı yemeye başladın.
          </p>
          <video src="/sansar-25.mp4" controls autoPlay />
        </div>
      );
    } else if (totalScore === 50) {
      return (
        <div>
          <p className="text-xl mb-4">
            Babanı dövme evresindesin. Elini korkak alıştırma!
          </p>
          <video src="/sansar-50.mp4" controls autoPlay />
        </div>
      );
    } else if (totalScore === 75) {
      return (
        <div>
          <p className="text-xl mb-4">
            Babanı dövdün. Artık gözün yükseklerde. Artık kimse birini senden
            koruyamaz AFERİN!
          </p>
          <video src="/sansar-75.mp4" controls autoPlay />
        </div>
      );
    } else if (totalScore === 100) {
      return (
        <div className="flex flex-col items-center">
          <p className="text-xl mb-4">
            Beyninde kalan son hücre de sinir krizi geçirdi. Artık tamamen
            "Sansar Salvo" olmayı başardın.
          </p>
          <video src="/sansar-100.mp4" controls autoPlay />
        </div>
      );
    }
  };

  const handleShowResult = () => {
    const unanswered = questions.filter((q) => !answers[q.id]).map((q) => q.id);

    if (unanswered.length > 0) {
      setMissingAnswers(unanswered);
      setShowResult(false);
    } else {
      setMissingAnswers([]);
      setShowResult(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10 mt-20">
      {questions.map((q) => (
        <div key={q.id} className="w-1/2 text-center">
          <p className="text-3xl">
            {q.id}. {q.question}
          </p>
          <div className="flex justify-center items-center gap-6 pt-10">
            <button
              className={`border px-4 py-2 text-2xl rounded-lg cursor-pointer ${
                answers[q.id] === "Evet"
                  ? "bg-green-600"
                  : "bg-green-800 hover:bg-green-900"
              }`}
              onClick={() => handleAnswer(q.id, "Evet")}
            >
              Evet
            </button>
            <button
              className={`border px-4 py-2 text-2xl rounded-lg cursor-pointer ${
                answers[q.id] === "Hayır"
                  ? "bg-red-600"
                  : "bg-red-800 hover:bg-red-900"
              }`}
              onClick={() => handleAnswer(q.id, "Hayır")}
            >
              Hayır
            </button>
          </div>
        </div>
      ))}

      {/* Eksik cevap uyarısı */}
      {missingAnswers.length > 0 && (
        <p className="text-red-500 mt-4 mb-6">
          Lütfen şu soruları cevaplayın: {missingAnswers.join(", ")}
        </p>
      )}

      {/* Sonuçları Gör Butonu */}
      <button
        className={` px-6 py-3 mb-10 text-xl rounded-lg cursor-pointer ${
          Object.keys(answers).length === questions.length
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-600 cursor-not-allowed"
        }`}
        onClick={handleShowResult}
      >
        Sonuçları Gör
      </button>

      {/* Sonuç */}
      {showResult && (
        <div className="mt-10 text-center">
          <p className="text-2xl font-bold">Toplam Puan: {totalScore}</p>
          <div className="text-xl mt-2">{getResult()}</div>
        </div>
      )}
    </div>
  );
}

export default Question;
