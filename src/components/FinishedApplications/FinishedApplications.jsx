import style from './FinishedApplications.module.scss'
import { DatePicker, ConfigProvider, notification } from 'antd';
import ruRU from 'antd/es/locale/ru_RU'
import { ArrowDown } from '../Svgs/Svgs';
import useSWR, { useSWRConfig } from 'swr';
import { fetcher, url } from '../../core/axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Loader from '../Loader/Loader';
import { Calendar } from '../../pages/DetailedApplication/Svgs';

const FinishedApplications = () => {
  const { data } = useSWR(`${url}/application/getAll`, fetcher);
  const { mutate } = useSWRConfig()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = data?.filter((application) => {
    const statusMatch = application.status === "Рассмотрена";
    const searchTermLower = searchTerm.toLowerCase();
    const normalIdMatch = application.normalId?.toString().includes(searchTermLower);
    const innMatch = application.inn?.toLowerCase().includes(searchTermLower);
    const companyNameMatch = application.name?.toLowerCase().includes(searchTermLower);

    return statusMatch && (normalIdMatch || innMatch || companyNameMatch);
  });

  const dateOnChange = (date, id, _id) => {
    try {
      mutate(`${url}/application/getAll`, fetcher(`${url}/application/set-date/${id}`, {
        method: 'POST',
        body: JSON.stringify({
          _id,
          date: date.toISOString(),
        }),
      }))
      notification.success({
        message: "Дата ответа успешно установлена.",
        duration: 2,
        style: { fontFamily: "Inter" }
      })
    } catch (e) {
      console.log(e)
    }
  };

  const statusStyles = {
    'В работе': style.inactive,
    'На уточнении': style.onClarification,
    'Отклонена': style.blocked,
    'На рассмотрении': style.active,
    'Рассмотрена': style.active
  }

  if (!data) return <Loader />

  return (
    <div className={style.wrapper}>
      <div className={style.topDiv}>
        <h2>Завершенные заявки</h2>
      </div>
      <div className={style.topWrapper}>
        <p></p>
        <div className={style.searchBar}>
          <input
            type="text"
            placeholder="Поиск по номеру заявки, компании или ИНН"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className={style.container}>
        <table className={style.usersTable}>
          <thead>
            <tr>
              <th>Номер заявки</th>
              <th>Компания</th>
              <th className={style.thRight}>Статус заявки <ArrowDown /></th>
              <th className={style.thRight} style={{paddingRight: '114px'}}>Срок ответа <ArrowDown /></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, i) => (
              <tr key={i}>
                <td >№{item.normalId}</td>
                <td >{item.name}<br /> <span>ИНН {item.inn}</span></td>
                <td className={style.flexEnd}><span className={statusStyles[item.status]}>{item.status}</span></td>
                <td className={style.flexEnd}>
                  <div>
                    {
                      !item.dateAnswer ? (
                        <ConfigProvider locale={ruRU}>
                          <DatePicker onChange={(date) => dateOnChange(date, item.owner, item._id)} />
                        </ConfigProvider>
                      ) : <button className={style.btnDate}>
                        <Calendar />
                        {item.dateAnswer}
                      </button>
                    }
                    <button className={style.next} onClick={() => navigate(`/application/${item._id}`)}>
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.16675 10H15.8334M15.8334 10L10.0001 4.16669M15.8334 10L10.0001 15.8334"
                          stroke="white"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FinishedApplications