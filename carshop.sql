PGDMP         &                w            carshop    12.1    12.0 "    h           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            i           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            j           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            k           1262    17592    carshop    DATABASE     �   CREATE DATABASE carshop WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Russian_Russia.1251' LC_CTYPE = 'Russian_Russia.1251';
    DROP DATABASE carshop;
                postgres    false            �            1259    23399 	   car_lists    TABLE     �   CREATE TABLE public.car_lists (
    id bigint NOT NULL,
    created_at bytea,
    updated_at bytea,
    name character varying(255) NOT NULL,
    user_id integer
);
    DROP TABLE public.car_lists;
       public         heap    postgres    false            �            1259    23407    car_lists_cars    TABLE     e   CREATE TABLE public.car_lists_cars (
    car_list_id bigint NOT NULL,
    cars_id bigint NOT NULL
);
 "   DROP TABLE public.car_lists_cars;
       public         heap    postgres    false            �            1259    23410    cars    TABLE     �   CREATE TABLE public.cars (
    id bigint NOT NULL,
    created_at bytea,
    updated_at bytea,
    color character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    price integer NOT NULL,
    carset_id bigint NOT NULL
);
    DROP TABLE public.cars;
       public         heap    postgres    false            �            1259    23418    cars_car_lists    TABLE     e   CREATE TABLE public.cars_car_lists (
    car_id bigint NOT NULL,
    car_lists_id bigint NOT NULL
);
 "   DROP TABLE public.cars_car_lists;
       public         heap    postgres    false            �            1259    23421    carsets    TABLE     �   CREATE TABLE public.carsets (
    id bigint NOT NULL,
    created_at bytea,
    updated_at bytea,
    name character varying(255) NOT NULL,
    type_id integer NOT NULL
);
    DROP TABLE public.carsets;
       public         heap    postgres    false            �            1259    23397    hibernate_sequence    SEQUENCE     {   CREATE SEQUENCE public.hibernate_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.hibernate_sequence;
       public          postgres    false            �            1259    23429    types    TABLE     a   CREATE TABLE public.types (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);
    DROP TABLE public.types;
       public         heap    postgres    false            �            1259    23434    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    created_at bytea,
    updated_at bytea,
    login character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            _          0    23399 	   car_lists 
   TABLE DATA           N   COPY public.car_lists (id, created_at, updated_at, name, user_id) FROM stdin;
    public          postgres    false    203   {'       `          0    23407    car_lists_cars 
   TABLE DATA           >   COPY public.car_lists_cars (car_list_id, cars_id) FROM stdin;
    public          postgres    false    204   �'       a          0    23410    cars 
   TABLE DATA           Y   COPY public.cars (id, created_at, updated_at, color, name, price, carset_id) FROM stdin;
    public          postgres    false    205   �'       b          0    23418    cars_car_lists 
   TABLE DATA           >   COPY public.cars_car_lists (car_id, car_lists_id) FROM stdin;
    public          postgres    false    206   �'       c          0    23421    carsets 
   TABLE DATA           L   COPY public.carsets (id, created_at, updated_at, name, type_id) FROM stdin;
    public          postgres    false    207   �'       d          0    23429    types 
   TABLE DATA           )   COPY public.types (id, name) FROM stdin;
    public          postgres    false    208   (       e          0    23434    users 
   TABLE DATA           R   COPY public.users (id, created_at, updated_at, login, name, password) FROM stdin;
    public          postgres    false    209   u(       l           0    0    hibernate_sequence    SEQUENCE SET     @   SELECT pg_catalog.setval('public.hibernate_sequence', 7, true);
          public          postgres    false    202            �
           2606    23406    car_lists car_lists_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.car_lists
    ADD CONSTRAINT car_lists_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.car_lists DROP CONSTRAINT car_lists_pkey;
       public            postgres    false    203            �
           2606    23417    cars cars_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.cars DROP CONSTRAINT cars_pkey;
       public            postgres    false    205            �
           2606    23428    carsets carsets_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.carsets
    ADD CONSTRAINT carsets_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.carsets DROP CONSTRAINT carsets_pkey;
       public            postgres    false    207            �
           2606    23433    types types_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.types
    ADD CONSTRAINT types_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.types DROP CONSTRAINT types_pkey;
       public            postgres    false    208            �
           2606    23443 $   carsets uk_klwc7qxbb4uxykc6lqwswxnt4 
   CONSTRAINT     b   ALTER TABLE ONLY public.carsets
    ADD CONSTRAINT uk_klwc7qxbb4uxykc6lqwswxnt4 UNIQUE (type_id);
 N   ALTER TABLE ONLY public.carsets DROP CONSTRAINT uk_klwc7qxbb4uxykc6lqwswxnt4;
       public            postgres    false    207            �
           2606    23445 "   users uk_ow0gan20590jrb00upg3va2fn 
   CONSTRAINT     ^   ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk_ow0gan20590jrb00upg3va2fn UNIQUE (login);
 L   ALTER TABLE ONLY public.users DROP CONSTRAINT uk_ow0gan20590jrb00upg3va2fn;
       public            postgres    false    209            �
           2606    23441    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    209            �
           2606    23451 *   car_lists_cars fk3p11gv570qvpdy8djuuyh6owi    FK CONSTRAINT     �   ALTER TABLE ONLY public.car_lists_cars
    ADD CONSTRAINT fk3p11gv570qvpdy8djuuyh6owi FOREIGN KEY (cars_id) REFERENCES public.cars(id);
 T   ALTER TABLE ONLY public.car_lists_cars DROP CONSTRAINT fk3p11gv570qvpdy8djuuyh6owi;
       public          postgres    false    204    2766    205            �
           2606    23446 %   car_lists fk8lbidw5vy5itc6b1uahfkxtrh    FK CONSTRAINT     �   ALTER TABLE ONLY public.car_lists
    ADD CONSTRAINT fk8lbidw5vy5itc6b1uahfkxtrh FOREIGN KEY (user_id) REFERENCES public.users(id);
 O   ALTER TABLE ONLY public.car_lists DROP CONSTRAINT fk8lbidw5vy5itc6b1uahfkxtrh;
       public          postgres    false    203    209    2776            �
           2606    23461     cars fkbeuomgmqb50uah44lqnkev625    FK CONSTRAINT     �   ALTER TABLE ONLY public.cars
    ADD CONSTRAINT fkbeuomgmqb50uah44lqnkev625 FOREIGN KEY (carset_id) REFERENCES public.carsets(id);
 J   ALTER TABLE ONLY public.cars DROP CONSTRAINT fkbeuomgmqb50uah44lqnkev625;
       public          postgres    false    205    2768    207            �
           2606    23476 #   carsets fkc9oueutk72w8y8qs6l337qnyt    FK CONSTRAINT     �   ALTER TABLE ONLY public.carsets
    ADD CONSTRAINT fkc9oueutk72w8y8qs6l337qnyt FOREIGN KEY (type_id) REFERENCES public.types(id);
 M   ALTER TABLE ONLY public.carsets DROP CONSTRAINT fkc9oueutk72w8y8qs6l337qnyt;
       public          postgres    false    207    2772    208            �
           2606    23466 *   cars_car_lists fkcjibxyw7fd8c7tcu8gx52xqva    FK CONSTRAINT     �   ALTER TABLE ONLY public.cars_car_lists
    ADD CONSTRAINT fkcjibxyw7fd8c7tcu8gx52xqva FOREIGN KEY (car_lists_id) REFERENCES public.car_lists(id);
 T   ALTER TABLE ONLY public.cars_car_lists DROP CONSTRAINT fkcjibxyw7fd8c7tcu8gx52xqva;
       public          postgres    false    2764    206    203            �
           2606    23456 *   car_lists_cars fkevsthnumv3mtnjgty42dxo21a    FK CONSTRAINT     �   ALTER TABLE ONLY public.car_lists_cars
    ADD CONSTRAINT fkevsthnumv3mtnjgty42dxo21a FOREIGN KEY (car_list_id) REFERENCES public.car_lists(id);
 T   ALTER TABLE ONLY public.car_lists_cars DROP CONSTRAINT fkevsthnumv3mtnjgty42dxo21a;
       public          postgres    false    2764    203    204            �
           2606    23471 *   cars_car_lists fkr582h0th47liq4tay7of7oaeu    FK CONSTRAINT     �   ALTER TABLE ONLY public.cars_car_lists
    ADD CONSTRAINT fkr582h0th47liq4tay7of7oaeu FOREIGN KEY (car_id) REFERENCES public.cars(id);
 T   ALTER TABLE ONLY public.cars_car_lists DROP CONSTRAINT fkr582h0th47liq4tay7of7oaeu;
       public          postgres    false    206    2766    205            _      x������ � �      `      x������ � �      a      x������ � �      b      x������ � �      c      x������ � �      d   Y   x��9@P@��Hl�qK��(u"z�!���o	���ĥ�0Zc���;�r+|uj"tV��4Z��������U}4�75      e   �   x�-�I�0 @�u{օ"ZݣQ���a�(2�@,	�7$$?� ��ػ�;�2>�-�L�aC;.C�'MM�	�I<����L�^�j�Ĳ�35��c[�<��sYz�&�bP ^�q��0b�J1J��.U�EIK�Mȿ��*/	\�z�f#��qs!��L3     