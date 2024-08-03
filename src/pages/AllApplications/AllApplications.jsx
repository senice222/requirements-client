import style from './AllApplications.module.scss'
import { Select, DatePicker, ConfigProvider } from 'antd';
import ruRU from 'antd/es/locale/ru_RU'
import { ArrowDown } from '../../components/Svgs/Svgs';

const AllApplications = () => {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const dateOnChange = (date, dateString) => {
        console.log(date, dateString);
    };
    return (
        <div className={style.wrapper}>
            <div className={style.topDiv}>
                <h2>Все заявки</h2>
            </div>
            <div className={style.topWrapper}>
                <div className={style.selects}>
                    <Select
                        style={{ width: 220, height: 44 }}
                        defaultValue="Все компании"
                        onChange={handleChange}
                        options={[
                            { value: 'В работе', label: 'В работе' },
                            { value: 'На уточнении', label: 'На уточнении' },
                            { value: 'Отклонена', label: 'Отклонена' },
                            { value: 'На рассмотрении', label: 'На рассмотрении' },
                            { value: 'Рассмотрена', label: 'Рассмотрена' },
                        ]}
                    />
                    <Select
                        style={{ width: 220, height: 44 }}
                        defaultValue="Все статусы"
                        onChange={handleChange}
                        options={[
                            { value: 'В работе', label: 'В работе' },
                            { value: 'На уточнении', label: 'На уточнении' },
                            { value: 'Отклонена', label: 'Отклонена' },
                            { value: 'На рассмотрении', label: 'На рассмотрении' },
                            { value: 'Рассмотрена', label: 'Рассмотрена' },
                        ]}
                    />
                </div>
                <div className={style.searchBar}>
                    <input type="text" placeholder="Поиск по номеру заказа, компании или ИНН" />
                </div>
            </div>
            <div className={style.container}>

                <table className={style.usersTable}>
                    <thead>
                        <tr>
                            <th>Номер заявки</th>
                            <th>Компания</th>
                            <th className={style.thRight}>Статус заявки <ArrowDown /></th>
                            <th className={style.thRight}>Срок ответа <ArrowDown /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {data.map((order: Order) => ( */}
                        <tr>
                            <td >№1</td>
                            <td >ООО “Привет”<br /> <span>ИНН 231391934342</span></td>
                            <td className={style.flexEnd}><span className={style.active}>Выполнен</span></td>
                            <td className={style.flexEnd}>
                                <div>
                                    <ConfigProvider locale={ruRU}>
                                        <DatePicker onChange={dateOnChange} />
                                    </ConfigProvider>
                                    <button className={style.next}>
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
                        {/* ))} */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllApplications