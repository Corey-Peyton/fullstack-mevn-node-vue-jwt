-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2021 at 03:17 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bsp_siswa`
--

-- --------------------------------------------------------

--
-- Table structure for table `agama`
--

CREATE TABLE `agama` (
  `id_agama` smallint(6) NOT NULL,
  `agama` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `agama`
--

INSERT INTO `agama` (`id_agama`, `agama`) VALUES
(1, 'Islam'),
(2, 'Kristen / Protestan'),
(3, 'Katholik'),
(4, 'Hindu'),
(5, 'Budha'),
(6, 'Kong Hu Chu');

-- --------------------------------------------------------

--
-- Table structure for table `ayah`
--

CREATE TABLE `ayah` (
  `id_ayah` varchar(12) NOT NULL,
  `nama_ayah` varchar(30) NOT NULL,
  `nik` varchar(16) NOT NULL,
  `tgl_lahir` date NOT NULL,
  `id_pendidikan` smallint(6) NOT NULL,
  `id_pekerjaan` smallint(6) NOT NULL,
  `id_penghasilan` smallint(6) NOT NULL,
  `id_disabilitas` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ayah`
--

INSERT INTO `ayah` (`id_ayah`, `nama_ayah`, `nik`, `tgl_lahir`, `id_pendidikan`, `id_pekerjaan`, `id_penghasilan`, `id_disabilitas`) VALUES
('PRM030221001', 'Suprani', '1234567891', '1980-09-01', 2, 2, 1, 1),
('PRM030221002', 'prayitno', '1234567891', '1980-09-01', 3, 2, 1, 1),
('PRM030221003', 'Andrew', '1234567891', '1980-09-01', 3, 2, 1, 1),
('PRM030221004', 'Johnson', '1234567891', '1980-09-01', 3, 13, 1, 1),
('PRM030221005', 'Ilham', '1234567891', '1980-09-01', 2, 2, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `bank`
--

CREATE TABLE `bank` (
  `id_bank` smallint(6) NOT NULL,
  `nama_bank` varchar(30) NOT NULL,
  `norek` varchar(30) NOT NULL,
  `atas_nama` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bank`
--

INSERT INTO `bank` (`id_bank`, `nama_bank`, `norek`, `atas_nama`) VALUES
(1, 'BCA', '123456789', 'Maria Ismi'),
(2, 'Mandiri', '123456789', 'Maria'),
(3, 'Permata', '123456789', 'Maria'),
(4, 'Cimb Niaga', '123456789', 'Maria'),
(5, 'BRI', '123456789', 'Maria'),
(6, 'BTN', '123456789', 'Maria'),
(7, 'BTPN', '123456789', 'Maria');

-- --------------------------------------------------------

--
-- Table structure for table `detail_beasiswa`
--

CREATE TABLE `detail_beasiswa` (
  `id_detail_beasiswa` smallint(6) NOT NULL,
  `id_siswa` varchar(12) NOT NULL,
  `jenis` varchar(30) NOT NULL,
  `keterangan` varchar(255) NOT NULL,
  `tahun_mulai` year(4) NOT NULL,
  `tahun_selesai` year(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detail_beasiswa`
--

INSERT INTO `detail_beasiswa` (`id_detail_beasiswa`, `id_siswa`, `jenis`, `keterangan`, `tahun_mulai`, `tahun_selesai`) VALUES
(1, 'SSW050221001', 'Sains', 'Juara 1 biologi murni', 2020, 2021),
(2, 'SSW050221001', 'Sains', 'Juara 1 matematika murni', 2020, 2021),
(3, 'SSW050221001', 'Fisika', 'Juara 1 fisika murni', 2020, 2021),
(4, 'SSW050221001', 'Sains', 'Juara 1 pidato', 2020, 2021);

-- --------------------------------------------------------

--
-- Table structure for table `detail_prestasi`
--

CREATE TABLE `detail_prestasi` (
  `id_detailprestasi` smallint(6) NOT NULL,
  `id_siswa` varchar(12) NOT NULL,
  `jenis_prestasi` char(1) NOT NULL,
  `tingkat_prestasi` char(1) NOT NULL,
  `nama_prestasi` varchar(50) NOT NULL,
  `tahun` year(4) NOT NULL,
  `penyelenggara` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detail_prestasi`
--

INSERT INTO `detail_prestasi` (`id_detailprestasi`, `id_siswa`, `jenis_prestasi`, `tingkat_prestasi`, `nama_prestasi`, `tahun`, `penyelenggara`) VALUES
(1, 'SSW050221001', '3', '2', 'Juara 1 menikung gebetan teman', 2021, 'Kantor Cabang Semesta'),
(2, 'SSW050221001', '3', '2', 'Juara 1 menikung gebetan teman', 2021, 'Kantor Cabang Semesta'),
(3, 'SSW050221001', '3', '2', 'Juara 1 menikung gebetan teman', 2021, 'Kantor Cabang Semesta'),
(4, 'SSW050221001', '3', '2', 'Juara 1 menikung gebetan teman', 2021, 'Kantor Cabang Semesta'),
(5, 'SSW050221001', '3', '2', 'Juara 1 menikung gebetan teman', 2021, 'Kantor Cabang Semesta'),
(6, 'SSW050221001', '3', '2', 'Juara 1 menikung gebetan teman', 2021, 'Kantor Cabang Semesta'),
(7, 'SSW050221001', '3', '2', 'Juara 1 menikung gebetan teman', 2021, 'Kantor Cabang Semesta');

-- --------------------------------------------------------

--
-- Table structure for table `disabilitas`
--

CREATE TABLE `disabilitas` (
  `id_disabilitas` smallint(6) NOT NULL,
  `status_disabilitas` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `disabilitas`
--

INSERT INTO `disabilitas` (`id_disabilitas`, `status_disabilitas`) VALUES
(1, 'Tidak'),
(2, 'Netra'),
(3, 'Rungu'),
(4, 'Grahita Ringan'),
(5, 'Grahita Sedang'),
(6, 'Daksa Ringan'),
(7, 'Daksa Sedang'),
(8, 'Laras'),
(9, 'Wicara'),
(10, 'Tuna Ganda'),
(11, 'Hiper Aktif'),
(12, 'Cerdas Istimewa'),
(13, 'Bakat Istimewa'),
(14, 'Kesulitan Belajar'),
(15, 'Narkoba'),
(16, 'Indigo'),
(17, 'Down Syndrom'),
(18, 'Autis');

-- --------------------------------------------------------

--
-- Table structure for table `ibu`
--

CREATE TABLE `ibu` (
  `id_ibu` varchar(12) NOT NULL,
  `nama_ibu` varchar(30) NOT NULL,
  `nik` varchar(16) NOT NULL,
  `tgl_lahir` date NOT NULL,
  `id_pendidikan` smallint(6) NOT NULL,
  `id_pekerjaan` smallint(6) NOT NULL,
  `id_penghasilan` smallint(6) NOT NULL,
  `id_disabilitas` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ibu`
--

INSERT INTO `ibu` (`id_ibu`, `nama_ibu`, `nik`, `tgl_lahir`, `id_pendidikan`, `id_pekerjaan`, `id_penghasilan`, `id_disabilitas`) VALUES
('PRF030221001', 'Surti', '1234567891', '1998-04-03', 3, 2, 1, 1),
('PRF030221002', 'Sari', '123456789', '1998-04-03', 1, 1, 1, 1),
('PRF030221003', 'Sari', '123456789', '1998-04-03', 1, 1, 1, 1),
('PRF030221004', 'Sari', '123456789', '1998-04-03', 1, 1, 1, 1),
('PRF030221005', 'Sari', '123456789', '1998-04-03', 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `jenis_alasan`
--

CREATE TABLE `jenis_alasan` (
  `id_jenisalasan` smallint(6) NOT NULL,
  `alasan` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jenis_alasan`
--

INSERT INTO `jenis_alasan` (`id_jenisalasan`, `alasan`) VALUES
(1, 'Lulus'),
(2, 'Mutasi'),
(3, 'Dikeluarkan'),
(4, 'Mengundurkan Diri'),
(5, 'Putus Sekolah'),
(6, 'Wafat'),
(7, 'Hilang');

-- --------------------------------------------------------

--
-- Table structure for table `kecamatan`
--

CREATE TABLE `kecamatan` (
  `id_kecamatan` smallint(6) NOT NULL,
  `kecamatan` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kecamatan`
--

INSERT INTO `kecamatan` (`id_kecamatan`, `kecamatan`) VALUES
(1, 'Selupu Rejang'),
(2, 'Antapani');

-- --------------------------------------------------------

--
-- Table structure for table `kelurahan`
--

CREATE TABLE `kelurahan` (
  `id_kelurahan` smallint(6) NOT NULL,
  `id_kecamatan` smallint(6) NOT NULL,
  `kelurahan` varchar(30) NOT NULL,
  `kode_pos` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kelurahan`
--

INSERT INTO `kelurahan` (`id_kelurahan`, `id_kecamatan`, `kelurahan`, `kode_pos`) VALUES
(1, 2, 'Antapani Kidul', '39152'),
(2, 2, 'Antapani Kulon', '40291'),
(3, 2, 'Antapani Wetan', '39152'),
(4, 2, 'Antapani Tengah', '39152');

-- --------------------------------------------------------

--
-- Table structure for table `pekerjaan`
--

CREATE TABLE `pekerjaan` (
  `id_pekerjaan` smallint(6) NOT NULL,
  `pekerjaan` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pekerjaan`
--

INSERT INTO `pekerjaan` (`id_pekerjaan`, `pekerjaan`) VALUES
(1, 'Belum / Tidak Bekerja'),
(2, 'Nelayan'),
(3, 'Petani'),
(4, 'Peternak'),
(5, 'PNS / TNI / Polri'),
(6, 'Karyawan Swasta'),
(7, 'Pedagang Kecil'),
(8, 'Pedagang Besar'),
(9, 'Wiraswasta'),
(10, 'Wirausaha'),
(11, 'Buruh'),
(12, 'Pensiunan'),
(13, 'Jobseeker');

-- --------------------------------------------------------

--
-- Table structure for table `pendidikan`
--

CREATE TABLE `pendidikan` (
  `id_pendidikan` smallint(6) NOT NULL,
  `pendidikan` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pendidikan`
--

INSERT INTO `pendidikan` (`id_pendidikan`, `pendidikan`) VALUES
(1, 'Tidak/Belum Sekolah'),
(2, 'Putus SD'),
(3, 'SD Sederajat'),
(4, 'SMP Sederajat'),
(5, 'SMA Sederajat'),
(6, 'D1'),
(7, 'D2'),
(8, 'D3'),
(9, 'D4/S1'),
(10, 'S2'),
(11, 'S3');

-- --------------------------------------------------------

--
-- Table structure for table `penghasilan`
--

CREATE TABLE `penghasilan` (
  `id_penghasilan` smallint(6) NOT NULL,
  `penghasilan` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `penghasilan`
--

INSERT INTO `penghasilan` (`id_penghasilan`, `penghasilan`) VALUES
(1, 'Kurang dari Rp. 500.000'),
(2, 'Rp. 500.000 - Rp. 999.999'),
(3, 'Rp. 1 Juta - Rp. 1.999.999'),
(4, 'Rp. 2 Juta - Rp. 4.999.999'),
(5, 'Rp. 5 Juta - 20.000.000'),
(6, 'Lebih dari 20 Juta');

-- --------------------------------------------------------

--
-- Table structure for table `pip`
--

CREATE TABLE `pip` (
  `id_pip` smallint(6) NOT NULL,
  `id_siswa` varchar(12) NOT NULL,
  `alasan_layakpip` varchar(25) NOT NULL,
  `no_kip` varchar(6) NOT NULL,
  `nama_kip` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pip`
--

INSERT INTO `pip` (`id_pip`, `id_siswa`, `alasan_layakpip`, `no_kip`, `nama_kip`) VALUES
(1, 'SSW050221001', 'Keluarga Kurang Mampu', '123456', 'Udin'),
(2, 'SSW050221001', 'Keluarga Kurang Mampu', '123456', 'Udin'),
(3, 'SSW050221001', 'Keluarga Kurang Mampu', '123456', 'Udin'),
(4, 'SSW050221001', 'Keluarga Kurang Mampu', '123456', 'Udin'),
(5, 'SSW050221001', 'Keluarga Kurang Mampu', '123456', 'Udin'),
(6, 'SSW050221001', 'Keluarga Kurang Mampu', '123456', 'Zulfi');

-- --------------------------------------------------------

--
-- Table structure for table `priodik_siswa`
--

CREATE TABLE `priodik_siswa` (
  `id_priodik_siswa` varchar(12) NOT NULL,
  `id_siswa` varchar(12) NOT NULL,
  `tinggi_badan` varchar(5) NOT NULL,
  `berat_badan` varchar(5) NOT NULL,
  `jarak_kesekolah` char(1) NOT NULL,
  `detail_jarak` varchar(3) NOT NULL,
  `jml_saudarakandung` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `priodik_siswa`
--

INSERT INTO `priodik_siswa` (`id_priodik_siswa`, `id_siswa`, `tinggi_badan`, `berat_badan`, `jarak_kesekolah`, `detail_jarak`, `jml_saudarakandung`) VALUES
('1', '1', '1', '1', '1', '1', '1'),
('PSW050221001', 'SSW050221001', '165', '72', '2', '100', '1'),
('PSW050221002', 'SSW050221001', '165', '72', '2', '100', '1'),
('PSW050221003', 'SSW050221001', '165', '72', '2', '100', '1'),
('PSW050221004', 'SSW050221001', '165', '72', '2', '100', '1'),
('PSW050221005', 'SSW050221001', '165', '72', '2', '100', '1'),
('PSW050221006', 'SSW050221002', '156', '71', '2', '100', '2'),
('PSW050221007', 'SSW050221013', '12', '12', '1', '12', '12'),
('PSW050221008', 'SSW050221014', '', '', '', '', ''),
('PSW050221009', 'SSW050221015', '165', '70', '1', '1', '1'),
('PSW050221010', 'SSW050221016', '1', '1', '1', '1', '1');

-- --------------------------------------------------------

--
-- Table structure for table `siswa`
--

CREATE TABLE `siswa` (
  `id_siswa` varchar(12) NOT NULL,
  `nama_lengkap` varchar(50) NOT NULL,
  `jenis_kelamin` char(1) NOT NULL,
  `nisn` char(10) NOT NULL,
  `nik` char(16) NOT NULL,
  `tmp_lahir` varchar(20) NOT NULL,
  `tgl_lahir` date NOT NULL,
  `id_agama` smallint(6) NOT NULL,
  `kewarganegaraan` varchar(3) NOT NULL,
  `id_disabilitas` smallint(3) NOT NULL,
  `alamat_lengkap` varchar(255) NOT NULL,
  `id_kelurahan` smallint(6) DEFAULT NULL,
  `nama_dusun` varchar(20) DEFAULT NULL,
  `no_rt` varchar(3) DEFAULT NULL,
  `no_rw` varchar(3) DEFAULT NULL,
  `id_statustinggal` smallint(6) DEFAULT NULL,
  `id_transportasi` smallint(6) DEFAULT NULL,
  `no_kps` varchar(20) DEFAULT NULL,
  `id_pip` smallint(6) DEFAULT NULL,
  `no_kks` varchar(20) DEFAULT NULL,
  `no_akta` varchar(20) DEFAULT NULL,
  `id_bank` smallint(6) DEFAULT NULL,
  `id_ayah` varchar(12) DEFAULT NULL,
  `id_ibu` varchar(12) DEFAULT NULL,
  `id_wali` varchar(12) DEFAULT NULL,
  `no_telp` varchar(20) DEFAULT NULL,
  `no_hp` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `siswa`
--

INSERT INTO `siswa` (`id_siswa`, `nama_lengkap`, `jenis_kelamin`, `nisn`, `nik`, `tmp_lahir`, `tgl_lahir`, `id_agama`, `kewarganegaraan`, `id_disabilitas`, `alamat_lengkap`, `id_kelurahan`, `nama_dusun`, `no_rt`, `no_rw`, `id_statustinggal`, `id_transportasi`, `no_kps`, `id_pip`, `no_kks`, `no_akta`, `id_bank`, `id_ayah`, `id_ibu`, `id_wali`, `no_telp`, `no_hp`, `email`) VALUES
('SSW050221001', 'Muhammad Nur Ilham', 'L', '1234567891', '1234567891', 'Serang', '2008-04-16', 1, 'WNI', 1, 'Kp. Kadomas', 1, 'Kadomas', '001', '001', 2, 1, NULL, NULL, NULL, '1234567891', NULL, 'PRM030221001', 'PRF030221001', NULL, '1234567891', '1234567891', 'siswa1@gmail.com'),
('SSW050221002', 'Diani Putri Amanah', 'P', '1234567891', '1234567891', 'Serang', '2008-05-27', 1, 'WNI', 1, 'Kp. Kadomas', 2, 'Kadomas', '001', '002', 2, 1, NULL, NULL, NULL, '1234567891', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('SSW050221003', 'Dyaatusholihah', 'P', '1234567891', '1234567891', 'Serang', '2017-09-15', 1, 'WNI', 1, 'Kp. Kadomas', 1, 'Kadomas', '001', '002', 2, 1, NULL, NULL, NULL, '1234567891', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('SSW050221004', 'Muhammad Fariz Danuri', 'L', '1234567891', '1234567891', 'Serang', '2017-10-21', 1, 'WNI', 1, 'Kp. Cinangka', 2, 'Cinangka', '001', '002', 2, 1, NULL, NULL, NULL, '1234567891', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('SSW050221005', 'Novi Novrianti', 'L', '1234567891', '1234567891', 'Serang', '2008-11-17', 1, 'WNI', 1, 'Kp. kadomas', 1, 'Kadomas', '001', '002', 2, 1, NULL, NULL, NULL, '1234567891', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('SSW050221006', 'Aprilia Husin', 'L', '1234567891', '1234567891', 'Serang', '2009-04-15', 1, 'WNI', 1, 'Kp. Kadomas', 1, 'Kadomas', '001', '002', 2, 1, NULL, NULL, NULL, '1234567891', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('SSW050221007', 'Edbert Marco', 'L', '1234567891', '1234567891', 'Serang', '2009-05-24', 2, 'WNI', 1, 'Kp. Kosambi', 2, 'Kosambi', '002', '002', 2, 1, NULL, NULL, NULL, '1234567891', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('SSW050221008', 'Nike Kamella', 'P', '1234567891', '1234567891', 'Gunung Kidul', '2009-07-02', 1, 'WNI', 1, 'Kp. Kadomas', 1, 'Kadomas', '001', '002', 2, 1, NULL, NULL, NULL, '1234567891', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('SSW050221009', 'Dinda Rofatussafwa', 'P', '1234567891', '1234567891', 'Serang', '2009-08-14', 1, 'WNI', 1, 'Kp. kadomas', 1, 'Kadomas', '001', '001', 2, 1, NULL, NULL, NULL, '1234567891', NULL, NULL, NULL, 'PRW03022100', NULL, NULL, NULL),
('SSW050221010', 'Sinta Sugiarta', 'P', '1234567891', '1234567891', 'Serang', '2016-02-05', 1, 'WNI', 1, 'Kp. Cinangka', 2, 'Cinangka', '001', '001', 2, 1, NULL, NULL, NULL, '1234567891', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('SSW050221011', 'Assipa Rohmawati', 'P', '1234567891', '1234567891', 'Serang', '2015-02-05', 1, 'WNI', 1, 'Kp. Kadomas', 1, 'Kadomas', '001', '001', 2, 1, NULL, NULL, NULL, '1234567891', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('SSW050221012', 'Machfudz Achyar Benzema', 'L', '1234567891', '1234567891', 'Serang', '2015-02-05', 2, 'WNI', 1, 'Kp. Kopi Bera', 1, 'Kopi Bera', '002', '002', 2, 1, NULL, NULL, NULL, '1234567891', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('SSW050221013', 'Nabilah Ratna Ayu', 'L', '123', '123', 'Cirebon', '2021-02-22', 1, 'WNI', 18, '123', 1, '123', '123', '123', 1, 1, '123', 1, '123', '123', 1, 'PRM030221001', 'PRF030221001', 'PRW030221001', '123', '123', '123'),
('SSW050221014', 'Muhammad Abdul Fatah', 'L', '123', '1234567891', 'Cirebon', '2021-02-22', 1, 'WNI', 1, 'Arjawinangun', 1, 'Abdul Fatah', '001', '002', 2, 1, '123', 1, '123', '123', 1, 'PRM030221001', 'PRF030221001', 'PRW030221001', '12345678910', '12345678910', 'permadiekapermana@gmail.com'),
('SSW050221015', 'Permadi Eka Permana', 'L', '123', '123', '123', '2006-05-23', 1, 'WNI', 1, 'cirebon', 1, 'Karangasem', '004', '001', 2, 1, '123', 1, '123', '123', 1, '', '', 'PRW030221001', '123', '123', 'p@gmail.com'),
('SSW050221016', '1', 'L', '1', '1234567891', '1', '2021-03-01', 1, 'WNI', 1, '1', 1, '1', '1', '1', 1, 1, '1', 1, '1', '1', 1, 'PRM030221001', 'PRF030221001', NULL, '1', '1', '1');

-- --------------------------------------------------------

--
-- Table structure for table `siswa_keluar`
--

CREATE TABLE `siswa_keluar` (
  `id_siswakeluar` varchar(12) NOT NULL,
  `id_siswa` varchar(12) NOT NULL,
  `id_jenisalasan` smallint(6) NOT NULL,
  `tgl_keluar` date NOT NULL,
  `keterangan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `siswa_keluar`
--

INSERT INTO `siswa_keluar` (`id_siswakeluar`, `id_siswa`, `id_jenisalasan`, `tgl_keluar`, `keterangan`) VALUES
('SWK050221001', 'SSW050221001', 1, '2021-02-21', ''),
('SWK050221002', 'SSW050221002', 2, '2021-02-11', ''),
('SWK050221003', 'SSW050221003', 2, '2021-02-11', ''),
('SWK050221004', 'SSW050221004', 1, '2021-02-11', '');

-- --------------------------------------------------------

--
-- Table structure for table `siswa_masuk`
--

CREATE TABLE `siswa_masuk` (
  `id_siswamasuk` varchar(12) NOT NULL,
  `id_siswa` varchar(12) NOT NULL,
  `jenis_daftar` char(1) NOT NULL,
  `tgl_masuk` date NOT NULL,
  `nis` varchar(10) NOT NULL,
  `no_ujian` varchar(20) NOT NULL,
  `no_ijasah` varchar(16) NOT NULL,
  `no_skhus` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `siswa_masuk`
--

INSERT INTO `siswa_masuk` (`id_siswamasuk`, `id_siswa`, `jenis_daftar`, `tgl_masuk`, `nis`, `no_ujian`, `no_ijasah`, `no_skhus`) VALUES
('SWM050221001', 'SSW050221001', '1', '2021-02-11', '122', '123', '123', '123'),
('SWM050221002', 'SSW050221002', '1', '2021-02-11', '122', '123', '123', '123'),
('SWM050221003', 'SSW050221003', '1', '2021-02-11', '122', '123', '123', '123'),
('SWM050221004', 'SSW050221004', '1', '2021-02-11', '122', '123', '123', '123'),
('SWM050221005', 'SSW050221005', '1', '2021-02-11', '123', '123', '123', '123'),
('SWM050221006', 'SSW050221013', '1', '2021-02-22', '12', '12123', '123', '123'),
('SWM050221007', 'SSW050221014', '1', '2021-02-22', '123', '123', '123', '123'),
('SWM050221008', 'SSW050221015', '1', '2021-03-01', '1', '1', '1', '1'),
('SWM050221009', 'SSW050221016', '1', '2021-03-01', '1', '1', '1', '1');

-- --------------------------------------------------------

--
-- Table structure for table `status_tinggal`
--

CREATE TABLE `status_tinggal` (
  `id_statustinggal` smallint(6) NOT NULL,
  `status_tinggal` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `status_tinggal`
--

INSERT INTO `status_tinggal` (`id_statustinggal`, `status_tinggal`) VALUES
(1, 'Lainnya'),
(2, 'Bersama Orang Tua'),
(3, 'Wali'),
(4, 'Kos'),
(5, 'Asrama'),
(6, 'Panti Asuhan');

-- --------------------------------------------------------

--
-- Table structure for table `transportasi`
--

CREATE TABLE `transportasi` (
  `id_transportasi` smallint(6) NOT NULL,
  `status_transportasi` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transportasi`
--

INSERT INTO `transportasi` (`id_transportasi`, `status_transportasi`) VALUES
(1, 'Jalan Kaki'),
(2, 'Kendaraan Pribadi'),
(3, 'Kendaraan Umum / Angkot / Pete Pete'),
(4, 'Jemputan Sekolah'),
(5, 'Kerete Api'),
(6, 'Ojek'),
(7, 'Andong / Bedi / Sado / Dokar / Delman / Beca'),
(8, 'Perahu Penyebrangan / Rakit / Getek');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `registered` datetime NOT NULL,
  `last_login` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `registered`, `last_login`) VALUES
('33763608-be84-49eb-bed5-da516b80eb05', 'susianti', '$2a$10$GCZzX3UWXOMFWMwZDUD2J.K/Q.FGx35tOuK6p6EXkgHk9FNXYm59W', '2021-03-02 12:10:53', NULL),
('8615076c-9037-4c48-88e8-810e2d329374', 'admin', '$2a$10$u2W/DVOS./WGAYdYURinFuPxyobkehLFNJSOyHgNDdg0EaTJBLAwe', '2021-03-01 10:40:41', '2021-03-01 12:19:51'),
('cfe70b7a-b087-48ff-839c-90ad462259c2', 'permadi', '$2a$10$jDl2f7RBaoaum1PGhLhXruSJe4Try5OLrV3K3/DfO42nArvrBbpny', '2021-02-24 13:50:06', '2021-03-04 09:11:46');

-- --------------------------------------------------------

--
-- Table structure for table `wali`
--

CREATE TABLE `wali` (
  `id_wali` varchar(12) NOT NULL,
  `nama_wali` varchar(30) NOT NULL,
  `jenis_kelamin` char(1) NOT NULL,
  `nik` varchar(16) NOT NULL,
  `tgl_lahir` date NOT NULL,
  `id_pendidikan` smallint(6) NOT NULL,
  `id_pekerjaan` smallint(6) NOT NULL,
  `id_penghasilan` smallint(6) NOT NULL,
  `id_disabilitas` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `wali`
--

INSERT INTO `wali` (`id_wali`, `nama_wali`, `jenis_kelamin`, `nik`, `tgl_lahir`, `id_pendidikan`, `id_pekerjaan`, `id_penghasilan`, `id_disabilitas`) VALUES
('PRW030221001', 'Tejo', 'L', '1234567891', '1998-04-03', 3, 2, 1, 1),
('PRW030221002', 'Surti', 'P', '123', '2021-02-11', 1, 1, 1, 1),
('PRW030221003', 'Surti', 'P', '123', '2021-02-11', 1, 1, 1, 1),
('PRW030221004', 'Surti', 'P', '123', '2021-02-11', 1, 1, 1, 1),
('PRW030221005', 'Surti', 'P', '123', '2021-02-11', 1, 1, 1, 1),
('PRW030221006', 'Surti', 'P', '123', '2021-02-11', 1, 1, 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agama`
--
ALTER TABLE `agama`
  ADD PRIMARY KEY (`id_agama`);

--
-- Indexes for table `ayah`
--
ALTER TABLE `ayah`
  ADD PRIMARY KEY (`id_ayah`),
  ADD KEY `id_pendidikan` (`id_pendidikan`),
  ADD KEY `id_pekerjaan` (`id_pekerjaan`),
  ADD KEY `id_penghasilan` (`id_penghasilan`),
  ADD KEY `id_disabilitas` (`id_disabilitas`);

--
-- Indexes for table `bank`
--
ALTER TABLE `bank`
  ADD PRIMARY KEY (`id_bank`);

--
-- Indexes for table `detail_beasiswa`
--
ALTER TABLE `detail_beasiswa`
  ADD PRIMARY KEY (`id_detail_beasiswa`),
  ADD KEY `id_siswa` (`id_siswa`);

--
-- Indexes for table `detail_prestasi`
--
ALTER TABLE `detail_prestasi`
  ADD PRIMARY KEY (`id_detailprestasi`);

--
-- Indexes for table `disabilitas`
--
ALTER TABLE `disabilitas`
  ADD PRIMARY KEY (`id_disabilitas`);

--
-- Indexes for table `ibu`
--
ALTER TABLE `ibu`
  ADD PRIMARY KEY (`id_ibu`),
  ADD KEY `id_pendidikan` (`id_pendidikan`),
  ADD KEY `id_pekerjaan` (`id_pekerjaan`),
  ADD KEY `id_penghasilan` (`id_penghasilan`),
  ADD KEY `id_disabilitas` (`id_disabilitas`);

--
-- Indexes for table `jenis_alasan`
--
ALTER TABLE `jenis_alasan`
  ADD PRIMARY KEY (`id_jenisalasan`);

--
-- Indexes for table `kecamatan`
--
ALTER TABLE `kecamatan`
  ADD PRIMARY KEY (`id_kecamatan`);

--
-- Indexes for table `kelurahan`
--
ALTER TABLE `kelurahan`
  ADD PRIMARY KEY (`id_kelurahan`),
  ADD KEY `id_kecamatan` (`id_kecamatan`);

--
-- Indexes for table `pekerjaan`
--
ALTER TABLE `pekerjaan`
  ADD PRIMARY KEY (`id_pekerjaan`);

--
-- Indexes for table `pendidikan`
--
ALTER TABLE `pendidikan`
  ADD PRIMARY KEY (`id_pendidikan`);

--
-- Indexes for table `penghasilan`
--
ALTER TABLE `penghasilan`
  ADD PRIMARY KEY (`id_penghasilan`);

--
-- Indexes for table `pip`
--
ALTER TABLE `pip`
  ADD PRIMARY KEY (`id_pip`),
  ADD KEY `id_siswa` (`id_siswa`);

--
-- Indexes for table `priodik_siswa`
--
ALTER TABLE `priodik_siswa`
  ADD PRIMARY KEY (`id_priodik_siswa`);

--
-- Indexes for table `siswa`
--
ALTER TABLE `siswa`
  ADD PRIMARY KEY (`id_siswa`),
  ADD KEY `id_disabilitas` (`id_disabilitas`),
  ADD KEY `id_agama` (`id_agama`),
  ADD KEY `id_kelurahan` (`id_kelurahan`),
  ADD KEY `id_statustinggal` (`id_statustinggal`),
  ADD KEY `id_transportasi` (`id_transportasi`),
  ADD KEY `id_pip` (`id_pip`),
  ADD KEY `id_bank` (`id_bank`),
  ADD KEY `id_ayah` (`id_ayah`),
  ADD KEY `id_ibu` (`id_ibu`),
  ADD KEY `id_wali` (`id_wali`);

--
-- Indexes for table `siswa_keluar`
--
ALTER TABLE `siswa_keluar`
  ADD PRIMARY KEY (`id_siswakeluar`),
  ADD KEY `id_siswa` (`id_siswa`),
  ADD KEY `id_jenisalasan` (`id_jenisalasan`);

--
-- Indexes for table `siswa_masuk`
--
ALTER TABLE `siswa_masuk`
  ADD PRIMARY KEY (`id_siswamasuk`);

--
-- Indexes for table `status_tinggal`
--
ALTER TABLE `status_tinggal`
  ADD PRIMARY KEY (`id_statustinggal`);

--
-- Indexes for table `transportasi`
--
ALTER TABLE `transportasi`
  ADD PRIMARY KEY (`id_transportasi`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wali`
--
ALTER TABLE `wali`
  ADD PRIMARY KEY (`id_wali`),
  ADD KEY `id_pendidikan` (`id_pendidikan`),
  ADD KEY `id_pekerjaan` (`id_pekerjaan`),
  ADD KEY `id_penghasilan` (`id_penghasilan`),
  ADD KEY `id_disabilitas` (`id_disabilitas`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agama`
--
ALTER TABLE `agama`
  MODIFY `id_agama` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `bank`
--
ALTER TABLE `bank`
  MODIFY `id_bank` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `detail_beasiswa`
--
ALTER TABLE `detail_beasiswa`
  MODIFY `id_detail_beasiswa` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `detail_prestasi`
--
ALTER TABLE `detail_prestasi`
  MODIFY `id_detailprestasi` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `disabilitas`
--
ALTER TABLE `disabilitas`
  MODIFY `id_disabilitas` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `jenis_alasan`
--
ALTER TABLE `jenis_alasan`
  MODIFY `id_jenisalasan` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `kecamatan`
--
ALTER TABLE `kecamatan`
  MODIFY `id_kecamatan` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `kelurahan`
--
ALTER TABLE `kelurahan`
  MODIFY `id_kelurahan` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `pekerjaan`
--
ALTER TABLE `pekerjaan`
  MODIFY `id_pekerjaan` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `pendidikan`
--
ALTER TABLE `pendidikan`
  MODIFY `id_pendidikan` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `penghasilan`
--
ALTER TABLE `penghasilan`
  MODIFY `id_penghasilan` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `pip`
--
ALTER TABLE `pip`
  MODIFY `id_pip` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `status_tinggal`
--
ALTER TABLE `status_tinggal`
  MODIFY `id_statustinggal` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `transportasi`
--
ALTER TABLE `transportasi`
  MODIFY `id_transportasi` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `kelurahan`
--
ALTER TABLE `kelurahan`
  ADD CONSTRAINT `kelurahan_ibfk_1` FOREIGN KEY (`id_kecamatan`) REFERENCES `kecamatan` (`id_kecamatan`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
