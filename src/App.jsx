import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
 const telegramChannelLink = "https://t.me/center_spisania";
const telegramLink = "https://t.me/morozov_dmitry_urist";
  const vkLink = "https://vk.com/uc_morozov";
  const phoneHref = "tel:+79370830303";
  const phoneText = "+7 (937) 083-03-03";

  const steps = [
    {
      number: "01",
      image: "/step-consultation.png",
      title: "Юридическая консультация",
      text: "Разбираем вашу ситуацию, сумму долга, имущество и возможные риски.",
    },
    {
      number: "02",
      image: "/step-contract.png",
      title: "Заключение договора",
      text: "Фиксируем условия сотрудничества и понятный план действий.",
    },
    {
      number: "03",
      image: "/step-documents.png",
      title: "Сбор документов",
      text: "Помогаем подготовить полный пакет документов для процедуры.",
    },
    {
      number: "04",
      image: "/step-court.png",
      title: "Подача заявления",
      text: "Передаём документы в суд и запускаем юридический процесс.",
    },
    {
      number: "05",
      image: "/step-bankruptcy.png",
      title: "Процедура банкротства",
      text: "Сопровождаем дело на всех этапах и защищаем ваши интересы.",
    },
    {
      number: "06",
      image: "/step-result.png",
      title: "Списание долгов",
      text: "После завершения процедуры клиент освобождается от долгов по закону.",
    },
  ];

  const cases = [
    {
      debt: "1 450 000 ₽",
      title: "Списаны долги по кредитам и МФО",
      time: "8 месяцев",
      result: "Долги списаны полностью",
    },
    {
      debt: "980 000 ₽",
      title: "Защита от банков и коллекторов",
      time: "7 месяцев",
      result: "Процедура завершена успешно",
    },
    {
      debt: "2 300 000 ₽",
      title: "Кредиты, просрочки и исполнительные производства",
      time: "10 месяцев",
      result: "Клиент освобождён от долгов",
    },
  ];

  function Header() {
    return (
      <>
        <div className="topBar">
          <span>📍 Волгоград, 2-я Динамовская, 10</span>

          <div className="topLinks">
            <a
             href={telegramChannelLink}
              target="_blank"
              rel="noreferrer"
              className="topTelegram"
            >
              <img src="/telegram.png" alt="Telegram" className="topTelegramIcon" />
              Telegram
            </a>

           <a
  href="https://max.ru/id341811585300_biz"
  target="_blank"
  rel="noreferrer"
  className="topMax"
>
  <img
    src="/max.png"
    alt="MAX"
    className="topMaxIcon"
  />
  MAX
</a>
            <a href={vkLink} target="_blank" rel="noreferrer" className="topVk">
              <img src="/vk.png" alt="VK" className="topVkIcon" />
              VK
            </a>

            <a href={phoneHref}>{phoneText}</a>
          </div>
        </div>

        <header className="header">
          <Link to="/" className="brand">
            <div className="brandLogo">
              <img src="/logo.png" alt="Морозов Юрист" />
            </div>

            <div>
              <strong>Дмитрий Морозов</strong>
              <span>Юрист по банкротству</span>
            </div>
          </Link>

          <nav className="nav">
            <Link to="/">Главная</Link>
            <Link to="/bankrotstvo">Банкротство</Link>
            <Link to="/kollektory">Коллекторы</Link>
            <Link to="/consultation">Консультация</Link>
            <Link to="/cases">Кейсы</Link>
            <Link to="/contacts">Контакты</Link>
          </nav>

          <a href={telegramLink} target="_blank" rel="noreferrer" className="headerBtn">
            Бесплатная консультация
          </a>
        </header>
      </>
    );
  }

  function ConsultationBlock() {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const sendLead = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          message,
          page: window.location.pathname,
        }),
      });

      const data = await response.json();

      if (data.ok) {
        alert("Заявка успешно отправлена!");
        setName("");
        setPhone("");
        setMessage("");
      } else {
        alert("Ошибка отправки заявки");
      }
    } catch (error) {
      alert("Ошибка соединения");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="consultation">
      <div className="consultationLeft">
        <span>Бесплатная консультация</span>

        <h2>Узнайте, можно ли списать ваши долги законно</h2>

        <p>
          Оставьте заявку и получите предварительную консультацию от Дмитрия
          Морозова. Разберём вашу ситуацию и предложим варианты решения.
        </p>

        <div className="consultationBenefits">
          <div>✓ Бесплатный анализ ситуации</div>
          <div>✓ Защита от коллекторов</div>
          <div>✓ Работа по 127-ФЗ</div>
          <div>✓ Полное сопровождение</div>
        </div>
      </div>

      <div className="consultationForm">
        <input
          type="text"
          placeholder="Ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Ваш телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <textarea
          placeholder="Опишите ситуацию"
          rows="5"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={sendLead}
          className="consultationBtn"
          disabled={loading}
        >
          {loading ? "Отправка..." : "Отправить заявку"}
        </button>
      </div>
    </section>
  );
}

  function HomePage() {
    return (
      <main>
        <section className="hero">
          <div className="heroContent">
            <div className="badge">Личный юрист по долговым вопросам</div>

            <h1>
              Дмитрий Морозов —
              <br />
              юридическая помощь
              <br />
              при долгах и банкротстве
            </h1>

            <p>
              Законно сопровождаю процедуру банкротства физических лиц, защищаю
              от давления банков и коллекторов, помогаю найти безопасное решение
              в сложной финансовой ситуации.
            </p>

            <div className="heroActions">
              <a href={telegramLink} target="_blank" rel="noreferrer" className="ghostBtn telegramBtn">
                <img src="/telegram.png" alt="Telegram" className="telegramIcon" />
                Написать в Telegram
              </a>
            </div>

            <div className="trustRow">
              <div>
                <strong>10+ лет</strong>
                <span>юридической практики</span>
              </div>

              <div>
                <strong>500+ дел</strong>
                <span>по долговым вопросам</span>
              </div>

              <div>
                <strong>100%</strong>
                <span>работа по закону</span>
              </div>
            </div>
          </div>

          <div className="heroCard">
            <div className="lawyerPhoto">
              <img src="/morozov-hero.png" alt="Дмитрий Морозов" />
            </div>

            <div className="lawyerInfo">
              <h3>Дмитрий Морозов</h3>
              <p>Юрист по банкротству физических лиц</p>
            </div>
          </div>
        </section>

        <section className="steps">
          <div className="sectionHead">
            <span>Как проходит работа</span>
            <h2>Процедура понятна с первого шага</h2>
          </div>

          <div className="stepsGrid">
            {steps.map((step) => (
              <article
                className="stepCard"
                key={step.number}
                style={{
                  backgroundImage: `linear-gradient(
                    90deg,
                    rgba(5, 10, 20, 0.94) 0%,
                    rgba(5, 10, 20, 0.76) 52%,
                    rgba(5, 10, 20, 0.58) 100%
                  ), url(${step.image})`,
                }}
              >
                <span className="stepNumber">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="services">
          <div className="sectionHead">
            <span>Направления работы</span>
            <h2>Помощь в ситуациях, когда долги начинают управлять жизнью</h2>
          </div>

          <div className="serviceGrid">
            <article>
              <span>01</span>
              <h3>Банкротство физических лиц</h3>
              <p>
                Полное сопровождение процедуры списания долгов: от консультации
                до завершения дела в суде.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Защита от коллекторов</h3>
              <p>
                Помощь при звонках, угрозах, давлении на родственников и
                незаконных действиях кредиторов.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Юридическая консультация</h3>
              <p>
                Разбор документов, оценка рисков и понятный план действий под
                вашу ситуацию.
              </p>
            </article>
          </div>
        </section>

        <ConsultationBlock />
      </main>
    );
  }

  function ServicePage({ badge, title, text, items }) {
    return (
      <main>
        <section className="pageHero">
          <span>{badge}</span>
          <h1>{title}</h1>
          <p>{text}</p>
        </section>

        <section className="pageGrid">
          {items.map((item, index) => (
            <article key={index}>
              <span>0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </section>

        <ConsultationBlock />
      </main>
    );
  }

  function CasesPage() {
    return (
      <main>
        <section className="pageHero">
          <span>Результаты работы</span>
          <h1>Кейсы клиентов</h1>
          <p>
            Примеры ситуаций, в которых клиентам удалось законно избавиться от
            долгов и давления кредиторов.
          </p>
        </section>

        <section className="casesGrid">
          {cases.map((item, index) => (
            <article className="caseCard" key={index}>
              <span>Долг</span>
              <h3>{item.debt}</h3>
              <p>{item.title}</p>

              <div>
                <strong>Срок:</strong> {item.time}
              </div>

              <div>
                <strong>Результат:</strong> {item.result}
              </div>
            </article>
          ))}
        </section>

        <ConsultationBlock />
      </main>
    );
  }

  function ContactsPage() {
    return (
      <main>
        <section className="pageHero">
          <span>Контакты</span>
          <h1>Связаться с Дмитрием Морозовым</h1>
          <p>
            Напишите в Telegram, позвоните или оставьте заявку на бесплатную
            консультацию.
          </p>
        </section>

        <section className="contactsBlock">
          <div>
            <h3>Адрес</h3>
            <p>Волгоград, 2-я Динамовская, 10</p>
          </div>

          <div>
            <h3>Телефон</h3>
            <p>{phoneText}</p>
          </div>

          <div>
            <h3>Telegram</h3>
            <a href={telegramLink} target="_blank" rel="noreferrer">
              @morozov_dmitry_urist
            </a>
          </div>
        </section>

        <ConsultationBlock />
      </main>
    );
  }

  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/bankrotstvo"
          element={
            <ServicePage
              badge="Банкротство физических лиц"
              title="Законное списание долгов через процедуру банкротства"
              text="Полное сопровождение процедуры банкротства физических лиц: от первичной консультации до завершения дела в суде."
              items={[
                {
                  title: "Анализ ситуации",
                  text: "Проверяем сумму долга, имущество, доходы и возможные риски перед началом процедуры.",
                },
                {
                  title: "Подготовка документов",
                  text: "Формируем пакет документов и подготавливаем заявление для подачи в суд.",
                },
                {
                  title: "Судебное сопровождение",
                  text: "Сопровождаем клиента на всех этапах процедуры и контролируем ход дела.",
                },
              ]}
            />
          }
        />

        <Route
          path="/kollektory"
          element={
            <ServicePage
              badge="Защита от коллекторов"
              title="Защита от давления банков и коллекторов"
              text="Помощь при звонках, угрозах, давлении на родственников и незаконных действиях кредиторов."
              items={[
                {
                  title: "Прекращение давления",
                  text: "Разбираем действия коллекторов и помогаем остановить незаконные звонки и угрозы.",
                },
                {
                  title: "Жалобы и обращения",
                  text: "Готовим обращения в контролирующие органы при нарушении ваших прав.",
                },
                {
                  title: "Переговоры через юриста",
                  text: "Берём коммуникацию с кредиторами на себя, чтобы снизить психологическое давление.",
                },
              ]}
            />
          }
        />

        <Route
          path="/consultation"
          element={
            <ServicePage
              badge="Юридическая консультация"
              title="Разбор вашей ситуации и понятный план действий"
              text="На консультации вы получите правовую оценку ситуации, понимание рисков и варианты дальнейших действий."
              items={[
                {
                  title: "Разбор документов",
                  text: "Изучаем кредиты, исполнительные производства, требования банков и другие документы.",
                },
                {
                  title: "Оценка рисков",
                  text: "Объясняем, что может произойти с имуществом, доходами и текущими обязательствами.",
                },
                {
                  title: "План действий",
                  text: "Формируем понятный юридический маршрут решения вашей проблемы.",
                },
              ]}
            />
          }
        />

        <Route path="/cases" element={<CasesPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
      </Routes>
    </div>
  );
}

export default App;