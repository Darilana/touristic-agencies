--
-- PostgreSQL database dump
--

-- Dumped from database version 12.20 (Debian 12.20-1.pgdg120+1)
-- Dumped by pg_dump version 17.0

-- Started on 2024-11-27 20:54:31

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- CREATE SCHEMA public;


-- ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3075 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

-- COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 548 (class 1247 OID 16389)
-- Name: agency_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.agency_status_enum AS ENUM (
    'ACTIVE',
    'INACTIVE'
);


ALTER TYPE public.agency_status_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 202 (class 1259 OID 16393)
-- Name: agency; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.agency (
    id integer NOT NULL,
    name character varying(500) NOT NULL,
    description text DEFAULT ''::text NOT NULL,
    "phoneNumber" character varying(15) NOT NULL,
    status public.agency_status_enum DEFAULT 'ACTIVE'::public.agency_status_enum NOT NULL
);


ALTER TABLE public.agency OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16401)
-- Name: agency_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.agency_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.agency_id_seq OWNER TO postgres;

--
-- TOC entry 3077 (class 0 OID 0)
-- Dependencies: 203
-- Name: agency_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.agency_id_seq OWNED BY public.agency.id;


--
-- TOC entry 204 (class 1259 OID 16403)
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 16409)
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_id_seq OWNER TO postgres;

--
-- TOC entry 3078 (class 0 OID 0)
-- Dependencies: 205
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- TOC entry 206 (class 1259 OID 16411)
-- Name: direction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.direction (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.direction OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 16417)
-- Name: direction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.direction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.direction_id_seq OWNER TO postgres;

--
-- TOC entry 3079 (class 0 OID 0)
-- Dependencies: 207
-- Name: direction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.direction_id_seq OWNED BY public.direction.id;


--
-- TOC entry 208 (class 1259 OID 16419)
-- Name: office; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.office (
    id integer NOT NULL,
    address text NOT NULL,
    "phoneNumber" character varying(15) NOT NULL,
    "workingHours" text NOT NULL,
    "agencyId" integer NOT NULL
);


ALTER TABLE public.office OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16425)
-- Name: office_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.office_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.office_id_seq OWNER TO postgres;

--
-- TOC entry 3080 (class 0 OID 0)
-- Dependencies: 209
-- Name: office_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.office_id_seq OWNED BY public.office.id;


--
-- TOC entry 210 (class 1259 OID 16427)
-- Name: tour; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tour (
    id integer NOT NULL,
    name text NOT NULL,
    description text DEFAULT ''::text NOT NULL,
    price integer NOT NULL,
    duration text NOT NULL,
    "agencyId" integer NOT NULL,
    image text
);


ALTER TABLE public.tour OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16434)
-- Name: tour_categories_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tour_categories_category (
    "tourId" integer NOT NULL,
    "categoryId" integer NOT NULL
);


ALTER TABLE public.tour_categories_category OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16437)
-- Name: tour_directions_direction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tour_directions_direction (
    "tourId" integer NOT NULL,
    "directionId" integer NOT NULL
);


ALTER TABLE public.tour_directions_direction OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16440)
-- Name: tour_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tour_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tour_id_seq OWNER TO postgres;

--
-- TOC entry 3081 (class 0 OID 0)
-- Dependencies: 213
-- Name: tour_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tour_id_seq OWNED BY public.tour.id;


--
-- TOC entry 214 (class 1259 OID 16499)
-- Name: typeorm_metadata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.typeorm_metadata (
    type character varying NOT NULL,
    database character varying,
    schema character varying,
    "table" character varying,
    name character varying,
    value text
);


ALTER TABLE public.typeorm_metadata OWNER TO postgres;

--
-- TOC entry 2895 (class 2604 OID 16442)
-- Name: agency id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agency ALTER COLUMN id SET DEFAULT nextval('public.agency_id_seq'::regclass);


--
-- TOC entry 2898 (class 2604 OID 16443)
-- Name: category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- TOC entry 2899 (class 2604 OID 16444)
-- Name: direction id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.direction ALTER COLUMN id SET DEFAULT nextval('public.direction_id_seq'::regclass);


--
-- TOC entry 2900 (class 2604 OID 16445)
-- Name: office id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.office ALTER COLUMN id SET DEFAULT nextval('public.office_id_seq'::regclass);


--
-- TOC entry 2901 (class 2604 OID 16446)
-- Name: tour id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour ALTER COLUMN id SET DEFAULT nextval('public.tour_id_seq'::regclass);


--
-- TOC entry 3057 (class 0 OID 16393)
-- Dependencies: 202
-- Data for Name: agency; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.agency (id, name, description, "phoneNumber", status) FROM stdin;
3	Coralline Travel	Маючи більш ніж 25-річний професійний досвід в сфері виїзного туризму, компанія Coralline Travel пропонує на українському туристичному ринку тільки високоякісний турпродукт. Coralline Travel пропонує найкращі курорти та готелі в 28 країнах світу. Йде постійна робота по АКТИВНЕ 01.02.1994 відкриттю нових напрямків. Туроператор організовує групові та індивідуальні FIT-тури на базі власних чартерних програм і регулярних рейсів, розвиває incentive-, congress-, спортивний та інші види туризму.	380931112227	ACTIVE
2	TUR	One of the leading travel companies in Ukraine. The company is part of the largest international tourism holding company TUR Group, with more than 10 years of experience. The company promotes beach, excursion and mountain skiing services on mass tourist routes.	380951112223	ACTIVE
\.


--
-- TOC entry 3059 (class 0 OID 16403)
-- Dependencies: 204
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id, name) FROM stdin;
1	Family
2	relax
3	shopping
4	Пляжний
5	Сімейний
6	Екскурсійний
7	Гірськолижний
8	Оздоровчий
9	Beach
10	Excursion
11	Wellness
12	Alpine skiing
\.


--
-- TOC entry 3061 (class 0 OID 16411)
-- Dependencies: 206
-- Data for Name: direction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.direction (id, name) FROM stdin;
1	France
2	Germany
3	milan
4	france
5	italy
6	Єгипет
7	Великобританія
8	Австрія
9	Германія
10	Франція
11	Egypt
12	Great Britain
13	Austria
\.


--
-- TOC entry 3063 (class 0 OID 16419)
-- Dependencies: 208
-- Data for Name: office; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.office (id, address, "phoneNumber", "workingHours", "agencyId") FROM stdin;
1	Unit #4, 23-ho Serpnya St, 10, Kharkiv, Ukraine	380951234568	9:00-19:00	2
4	Unit #102, Velyka Arnauts'ka St, 4А, Odesa, Ukraine	380931112227	10:00-18:00	3
\.


--
-- TOC entry 3065 (class 0 OID 16427)
-- Dependencies: 210
-- Data for Name: tour; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tour (id, name, description, price, duration, "agencyId", image) FROM stdin;
7	Mysteries of Egypt	The advantages of Egypt are known to everyone: high-quality beach holidays all year round on the Mediterranean and Red Seas, excellent diving, plus a diverse excursion program: the pyramids, the Sphinx and Luxor. You will find all this in our tour.	1199	P10D	3	96a1316a431122110a8da82aff6fd9fc9
8	Tea for two or a weekend in English	Foggy Albion appears in the imagination in the images of ancient castles, mysterious palaces, noble gentlemen and real ladies, strict traditions and amazing stories. You will be surprised, all this NULL plane 5 can be found in our days. Our tour offers not only an overview of the main attractions of England, but also excellent shopping, a variety of cuisine, as well as visiting a football match.	1300	P8D	2	7045e183fa991c64fe629c5dfa179527
10	Wellness SPA tour	Such a tour will appeal to those who like not only to enjoy a beach or excursion vacation, but also to return from vacation with improved health. In our tour to medical resorts in France, we offer balneotherapy - everything related to thermal natural waters for external and internal use.	2000	P10D	2	6bda498060d7c1da410daa2f08623962
9	Snow-capped Alps	The ski slopes map of Austria is diverse. It offers a sufficient number of routes of varying difficulty for beginners, intermediate skiers and professional athletes. In this tour we offer a choice of several ski resorts in the Salzburg and Tyrol area.	2300	P6D	3	23acdf82a4ff16f84dff810d1e4edade9
\.


--
-- TOC entry 3066 (class 0 OID 16434)
-- Dependencies: 211
-- Data for Name: tour_categories_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tour_categories_category ("tourId", "categoryId") FROM stdin;
7	9
7	1
8	10
10	10
10	11
9	12
9	10
\.


--
-- TOC entry 3067 (class 0 OID 16437)
-- Dependencies: 212
-- Data for Name: tour_directions_direction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tour_directions_direction ("tourId", "directionId") FROM stdin;
7	11
8	12
10	2
10	1
9	13
9	2
\.


--
-- TOC entry 3069 (class 0 OID 16499)
-- Dependencies: 214
-- Data for Name: typeorm_metadata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.typeorm_metadata (type, database, schema, "table", name, value) FROM stdin;
\.


--
-- TOC entry 3082 (class 0 OID 0)
-- Dependencies: 203
-- Name: agency_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.agency_id_seq', 4, true);


--
-- TOC entry 3083 (class 0 OID 0)
-- Dependencies: 205
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_id_seq', 12, true);


--
-- TOC entry 3084 (class 0 OID 0)
-- Dependencies: 207
-- Name: direction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.direction_id_seq', 13, true);


--
-- TOC entry 3085 (class 0 OID 0)
-- Dependencies: 209
-- Name: office_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.office_id_seq', 4, true);


--
-- TOC entry 3086 (class 0 OID 0)
-- Dependencies: 213
-- Name: tour_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tour_id_seq', 10, true);


--
-- TOC entry 2914 (class 2606 OID 16448)
-- Name: office PK_200185316ba169fda17e3b6ba00; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.office
    ADD CONSTRAINT "PK_200185316ba169fda17e3b6ba00" PRIMARY KEY (id);


--
-- TOC entry 2920 (class 2606 OID 16450)
-- Name: tour_categories_category PK_94206b5d50cab4f57da768ff450; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_categories_category
    ADD CONSTRAINT "PK_94206b5d50cab4f57da768ff450" PRIMARY KEY ("tourId", "categoryId");


--
-- TOC entry 2916 (class 2606 OID 16452)
-- Name: tour PK_972cd7fa4ec39286068130fa3f7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour
    ADD CONSTRAINT "PK_972cd7fa4ec39286068130fa3f7" PRIMARY KEY (id);


--
-- TOC entry 2906 (class 2606 OID 16454)
-- Name: category PK_9c4e4a89e3674fc9f382d733f03; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY (id);


--
-- TOC entry 2904 (class 2606 OID 16456)
-- Name: agency PK_ab1244724d1c216e9720635a2e5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agency
    ADD CONSTRAINT "PK_ab1244724d1c216e9720635a2e5" PRIMARY KEY (id);


--
-- TOC entry 2910 (class 2606 OID 16458)
-- Name: direction PK_cd7122416e3f733711b5cfa2924; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.direction
    ADD CONSTRAINT "PK_cd7122416e3f733711b5cfa2924" PRIMARY KEY (id);


--
-- TOC entry 2924 (class 2606 OID 16460)
-- Name: tour_directions_direction PK_f6f7073af10f5b514066358eee6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_directions_direction
    ADD CONSTRAINT "PK_f6f7073af10f5b514066358eee6" PRIMARY KEY ("tourId", "directionId");


--
-- TOC entry 2908 (class 2606 OID 16462)
-- Name: category UQ_23c05c292c439d77b0de816b500; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE (name);


--
-- TOC entry 2912 (class 2606 OID 16464)
-- Name: direction UQ_edf14d6421b3ae4eaf7517cd8a7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.direction
    ADD CONSTRAINT "UQ_edf14d6421b3ae4eaf7517cd8a7" UNIQUE (name);


--
-- TOC entry 2917 (class 1259 OID 16465)
-- Name: IDX_0d4c094c0d41ae182b361e97bf; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_0d4c094c0d41ae182b361e97bf" ON public.tour_categories_category USING btree ("categoryId");


--
-- TOC entry 2918 (class 1259 OID 16466)
-- Name: IDX_0e7feb624b3ef4310bad81cf83; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_0e7feb624b3ef4310bad81cf83" ON public.tour_categories_category USING btree ("tourId");


--
-- TOC entry 2921 (class 1259 OID 16467)
-- Name: IDX_347bbcaa2259c5db3aee3caafa; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_347bbcaa2259c5db3aee3caafa" ON public.tour_directions_direction USING btree ("directionId");


--
-- TOC entry 2922 (class 1259 OID 16468)
-- Name: IDX_abcf913f9e0cdd69c58acb7c8c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_abcf913f9e0cdd69c58acb7c8c" ON public.tour_directions_direction USING btree ("tourId");


--
-- TOC entry 2927 (class 2606 OID 16520)
-- Name: tour_categories_category FK_0d4c094c0d41ae182b361e97bf6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_categories_category
    ADD CONSTRAINT "FK_0d4c094c0d41ae182b361e97bf6" FOREIGN KEY ("categoryId") REFERENCES public.category(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2928 (class 2606 OID 16515)
-- Name: tour_categories_category FK_0e7feb624b3ef4310bad81cf836; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_categories_category
    ADD CONSTRAINT "FK_0e7feb624b3ef4310bad81cf836" FOREIGN KEY ("tourId") REFERENCES public.tour(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2929 (class 2606 OID 16510)
-- Name: tour_directions_direction FK_347bbcaa2259c5db3aee3caafa4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_directions_direction
    ADD CONSTRAINT "FK_347bbcaa2259c5db3aee3caafa4" FOREIGN KEY ("directionId") REFERENCES public.direction(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2925 (class 2606 OID 16484)
-- Name: office FK_7fc741b4c54efbb6350a5c75439; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.office
    ADD CONSTRAINT "FK_7fc741b4c54efbb6350a5c75439" FOREIGN KEY ("agencyId") REFERENCES public.agency(id);


--
-- TOC entry 2930 (class 2606 OID 16505)
-- Name: tour_directions_direction FK_abcf913f9e0cdd69c58acb7c8c2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_directions_direction
    ADD CONSTRAINT "FK_abcf913f9e0cdd69c58acb7c8c2" FOREIGN KEY ("tourId") REFERENCES public.tour(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2926 (class 2606 OID 16494)
-- Name: tour FK_ee78fa6978940a0e9cc471c4042; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour
    ADD CONSTRAINT "FK_ee78fa6978940a0e9cc471c4042" FOREIGN KEY ("agencyId") REFERENCES public.agency(id);


--
-- TOC entry 3076 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2024-11-27 20:54:31

--
-- PostgreSQL database dump complete
--

