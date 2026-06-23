import { useState, useEffect, useCallback } from 'react';
import {
  Users,
  Play,
  Settings,
  Eye,
  EyeOff,
  ChevronRight,
  Plus,
  X,
  Check,
  Clock,
  AlertTriangle,
  RefreshCw,
  Skull,
  Target,
  Zap,
} from 'lucide-react';

const WORD_CATEGORIES: Record<string, { name: string; hint: string; words: string[] }> = {
  food: {
    name: 'Yiyecekler',
    hint: 'Yenen bir şey',
    words: [
      'Pizza', 'Suşi', 'Hamburger', 'Tako', 'Makarna', 'Dondurma', 'Çikolatalı Pasta',
      'Sandviç', 'Salata', 'Çorba', 'Biftek', 'Tavuk Kızartması', 'Mantı', 'Köri',
      'Pancake', 'Waffle', 'Kruvasan', 'Donut', 'Elmalı Turta', 'Cheesecake',
      'Patates Kızartması', 'Soğan Halkası',
    ],
  },
  animals: {
    name: 'Hayvanlar',
    hint: 'Bir canlı',
    words: [
      'Aslan', 'Fil', 'Zürafa', 'Penguen', 'Yunus', 'Köpekbalığı', 'Kartal', 'Kurt',
      'Ayı', 'Kaplan', 'Zebra', 'Maymun', 'Kanguru', 'Tavşan', 'Baykuş', 'Tilki', 'Geyik',
      'Balina', 'Ahtapot', 'Denizanası', 'Timsah', 'Flamingo', 'Tavuskuşu', 'Çita',
      'Goril', 'Yarasa', 'Tembel Hayvan', 'Kirpi',
    ],
  },
  professions: {
    name: 'Meslekler',
    hint: 'Bir iş veya kariyer',
    words: [
      'Doktor', 'Öğretmen', 'İtfaiyeci', 'Aşçı', 'Pilot', 'Avukat', 'Mimar',
      'Mühendis', 'Hemşire', 'Sanatçı', 'Müzisyen', 'Bilim İnsanı', 'Gazeteci', 'Oyuncu',
      'Dişçi', 'Eczacı', 'Elektrikçi', 'Tesisatçı', 'Marangoz', 'Tamirci',
      'Tasarımcı', 'Fotoğrafçı', 'Veteriner', 'Kütüphaneci', 'Muhasebeci', ' Dedektif',
      'Astronot', 'Şarkıcı',
    ],
  },
  places: {
    name: 'Ünlü Yerler',
    hint: 'Tanınmış bir yer',
    words: [
      'Eyfel Kulesi', 'Özgürlük Heykeli', 'Çin Seddi',
      'Kanyon', 'Tac Mahal', 'Kolezyum', 'Niagara Şelalesi', 'Everest Dağı',
      'Venedik', 'Tokyo Kulesi', 
      'Sidney Opera Binası', 'Times Meydanı',
      'Hollywood Yazısı', 'Pisa Kulesi',
      'Yellowstone', 'Amazon Yağmur Ormanları', 'Sahra Çölü', 'Kuzey Işıkları',
    ],
  },
  sports: {
    name: 'Sporlar',
    hint: 'Bir spor veya fiziksel aktivite',
    words: [
      'Futbol', 'Basketbol', 'Tenis', 'Yüzme', 'Boks', 'Golf', 'Beyzbol',
      'Voleybol', 'Buz Hokeyi', 'Kriket', 'Ragbi', 'Bisiklet', 'Kayak', 'Sörf',
      'Kaykay', 'Jimnastik', 'Güreş', 'Dövüş Sanatları', 'Okçuluk',
      'Eskrim', 'Kürek', 'Dalma', 'Maraton', 'Triatlon', 'Kaya Tırmanışı',
      'Snowboard', 'Badminton', 'Masa Tenisi',
    ],
  },
  objects: {
    name: 'Ev Eşyaları',
    hint: 'Yaygın bir eşya',
    words: [
      'Sandalye', 'Masa', 'Lamba', 'Ayna', 'Saat', 'Vazo', 'Mum', 'Yastık',
      'Battaniye', 'Halı', 'Perde', 'Kitaplık', 'Koltuk', 'Televizyon', 'Buzdolabı',
      'Mikrodalga', 'Tost Makinesi', 'Blender', 'Elektrikli Süpürge', 'Çamaşır Makinesi', 'Anahtar',
      'Şemsiye', 'Sırt Çantası', 'Gözlük', 'Kol Saati', 'Cüzdan', 'Çanta', 'Makas',
    ],
  },
  /** 
    movies: {
      name: 'Film Türleri',
      hint: 'Bir film türü',
      words: [
        'Korku Filmi', 'Aksiyon Filmi', 'Komedi', 'Romantik', 'Gerilim', 'Bilim Kurgu',
        'Fantastik', 'Belgesel', 'Animasyon', 'Müzikal', 'Western', 'Savaş Filmi',
        'Gizem', 'Macera', 'Suç Dramı', 'Tarihi', 'Süper Kahraman Filmi',
        'Felaket Filmi', 'Casus Filmi', 'Soygun Filmi', 'Spor Filmi', 'Aile Filmi',
        'Canavar Filmi', 'Zombi Filmi', 'Hayalet Hikayesi', 'Masal',
      ],
    },
  */
  characters: {
    name: 'Karakter Türleri',
    hint: 'Bir karakter türü',
    words: [
      'Süper Kahraman', 'Kötü Adam', 'Büyücü', 'Prenses', 'Şövalye', 'Korsan', 'Ninja',
      'Astronot', 'Robot', 'Uzaylı', 'Hayalet', 'Vampir', 'Kurt Adam', 'Zombi',
      'Dedektif', 'Casus', 'Kovboy', 'Samuray', 'Viking', 'Kaşif', 'Mucit',
      'Kral', 'Kraliçe', 'Dahi', 'Savaşçı', 'Peri', 'Deniz Kızı', 'Ejderha',
    ],
  },
  nature: {
    name: 'Doğa ve Yerler',
    hint: 'Doğal bir yer',
    words: [
      'Orman', 'Plaj', 'Çöl', 'Dağ', 'Nehir', 'Göl', 'Şelale',
      'Mağara', 'Volkan', 'Buzul', 'Kanyon', 'Vadi', 'Çayır', 'Bataklık',
      'Yağmur Ormanı', 'Ada', 'Uçurum', 'Tepe', 'Gölet', 'Dere',
      'Sazlık', 'Resif', 'Kum Tepesi', 'Yayla',
    ],
  },
  school: {
    name: 'Okul ve İş Eşyaları',
    hint: 'Okuldan veya ofisten bir şey',
    words: [
      'Kurşun Kalem', 'Defter', 'Silgi', 'Sırt Çantası', 'Hesap Makinesi', 'Cetvel',
      'Makas', 'Yapıştırıcı', 'Zımba', 'Dosya', 'Beyaz Tahta', 'Tahta Kalemi',
      'Projeksiyon Cihazı', 'Bilgisayar', 'Yazıcı', 'Masa', 'Sandalye', 'Dolap',
      'Ders Kitabı', 'Flüoresan Kalemi', 'Bant', 'Ataş', 'Dolma Kalem', 'Klasör',
      'Yazı Tahtası', 'Dünya Küresi', 'Mikroskop', 'Resim Sehpası',
    ],
  },
  instruments: {
    name: 'Müzik Aletleri',
    hint: 'Bir müzik aleti',
    words: [
      'Gitar', 'Piyano', 'Keman', 'Davul', 'Flüt', 'Trompet', 'Saksofon',
      'Klarnet', 'Çello', 'Harp', 'Zil', 'Akordeon', 'Mızıka',
      'Banjo', 'Ukulele', 'Obua', 'Fagot', 'Trombon',
      'Mandolin', 'Zil', 'Bas Gitar', 'Klavye', 'Org',
    ],
  },
  technology: {
    name: 'Teknoloji ve Cihazlar',
    hint: 'Teknolojik bir cihaz',
    words: [
      'Akıllı Telefon', 'Dizüstü Bilgisayar', 'Tablet', 'Akıllı Saat', 'Kulaklık', 'Kamera',
      'Yazıcı', 'Tarayıcı', 'Projeksiyon Cihazı', 'Hoparlör', 'Mikrofon', 'Klavye',
      'Fare', 'Monitör', 'Oyun Konsolu', 'VR Gözlük', 'Drone',
      'Router', 'USB Bellek', 'Harici Disk', 'Web Kamera',
      'Şarj Aleti', 'Bluetooth Kulaklık', 'PowerBank','Akıllı TV',
    ],
  },
};

type GameScreen =
  | 'mode-select'
  | 'player-setup'
  | 'category-select'
  | 'settings'
  | 'role-reveal'
  | 'clue-round'
  | 'results';

interface Player {
  id: string;
  name: string;
  isImposter: boolean;
  isStartingPlayer: boolean;
  hasViewedRole: boolean;
}

interface GameState {
  screen: GameScreen;
  players: Player[];
  selectedCategories: string[];
  imposterCount: number;
  hintEnabled: boolean;
  timerEnabled: boolean;
  timerDuration: number;
  currentWord: string;
  currentCategoryHint: string;
  currentPlayerIndex: number;
  usedWords: string[];
  isOnline: boolean;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

// ============================================
// ROLE ASSIGNMENT FUNCTIONS (CRITICAL LOGIC)
// ============================================

function assignRoles(playerIds: string[], imposterCount: number): Set<string> {
  const imposterIds = new Set<string>();
  const availableIds = [...playerIds];

  while (imposterIds.size < imposterCount && availableIds.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableIds.length);
    imposterIds.add(availableIds[randomIndex]);
    availableIds.splice(randomIndex, 1);
  }

  return imposterIds;
}

function pickStartingPlayer(nonImposterIds: string[]): string {
  const randomIndex = Math.floor(Math.random() * nonImposterIds.length);
  return nonImposterIds[randomIndex];
}

function selectRandomWord(categories: string[], usedWords: string[]): { word: string; hint: string } | null {
  const availableWords: { word: string; hint: string }[] = [];

  categories.forEach((catKey) => {
    const category = WORD_CATEGORIES[catKey];
    if (category) {
      category.words.forEach((word) => {
        if (!usedWords.includes(word)) {
          availableWords.push({ word, hint: category.hint });
        }
      });
    }
  });

  if (availableWords.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * availableWords.length);
  return availableWords[randomIndex];
}

// ============================================
// COMPONENTS
// ============================================

function ModeSelectScreen({ onSelectSingle, onSelectOnline }: { onSelectSingle: () => void; onSelectOnline: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">
          <span className="inline-block animate-pulse">
            <Skull className="w-20 h-20 mx-auto text-red-500" />
          </span>
        </div>
        <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">
          Kim <span className="text-red-500">İmposter</span>
        </h1>
        <p className="text-slate-500 text-md"> Geç olmadan sahtekârı bulun..</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <button
          onClick={onSelectSingle}
          className="flex-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold py-6 px-8 rounded-2xl shadow-lg shadow-red-500/30 transform hover:scale-105 transition-all duration-200"
        >
          <div className="flex items-center justify-center gap-3">
            <Users className="w-6 h-6" />
            <span className="text-xl">Tek Cihaz</span>
          </div>
          <p className="text-red-100 text-sm mt-2">Bir cihazda sırayla oyna</p>
        </button>

        <button
          onClick={onSelectOnline}
          className="flex-1 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white font-bold py-6 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200 border border-slate-500"
        >
          <div className="flex items-center justify-center gap-3">
            <Zap className="w-6 h-6" />
            <span className="text-xl">Çevrimiçi</span>
          </div>
          <p className="text-slate-300 text-sm mt-2">Arkadaşlarınla uzaktan oyna</p>
        </button>
      </div>

    </div>
  );
}

function ComingSoonModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl p-8 max-w-sm w-full text-center border border-slate-700 shadow-2xl">
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="text-2xl font-bold text-white mb-3">Yakında!</h2>
        <p className="text-slate-400 mb-6">
          Çevrimiçi çok oyunculu mod şu anda geliştirme aşamasında.
        </p>
        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-400 text-white font-bold py-3 px-8 rounded-xl transition-colors"
        >
          Anladım
        </button>
      </div>
    </div>
  );
}

function PlayerSetupScreen({
  players,
  onAddPlayer,
  onRemovePlayer,
  onUpdatePlayerName,
  onContinue,
  onBack,
}: {
  players: Player[];
  onAddPlayer: () => void;
  onRemovePlayer: (id: string) => void;
  onUpdatePlayerName: (id: string, name: string) => void;
  onContinue: () => void;
  onBack: () => void;
}) {
  const canStart = players.length >= 3;
  const hasDuplicate = players.some(
    (p, i) => players.findIndex((p2) => p2.name.toLowerCase() === p.name.toLowerCase()) !== i && p.name.trim()
  );
  const hasEmpty = players.some((p) => !p.name.trim());

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col p-4">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          Geri
        </button>
        <h1 className="text-2xl font-bold text-white">Oyuncu Kurulumu</h1>
        <div className="w-16" />
      </div>

      <div className="flex-1 max-w-md mx-auto w-full">
        <div className="mb-4 text-slate-400 text-center">
          {3 - players.length > 0 ? `${3 - players.length} oyuncu daha ekle` : 'Oyuncularınızı ekleyin'} (3-15 oyuncu)
        </div>

        <div className="space-y-3 mb-4">
          {players.map((player, index) => (
            <div
              key={player.id}
              className="flex items-center gap-2 bg-slate-800/50 p-3 rounded-xl border border-slate-700"
            >
              <span className="text-slate-500 font-medium w-8">{index + 1}.</span>
              <input
                type="text"
                value={player.name}
                onChange={(e) => onUpdatePlayerName(player.id, e.target.value)}
                placeholder="İsim girin..."
                className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none"
              />
              {players.length > 3 && (
                <button
                  onClick={() => onRemovePlayer(player.id)}
                  className="text-slate-500 hover:text-red-400 transition-colors p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {hasDuplicate && (
          <div className="flex items-center gap-2 text-amber-400 text-sm mb-4 bg-amber-400/10 p-3 rounded-lg">
            <AlertTriangle className="w-4 h-4" />
            Tekrarlanan isimler tespit edildi
          </div>
        )}

        {players.length < 15 && (
          <button
            onClick={onAddPlayer}
            className="w-full flex items-center justify-center gap-2 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors mb-4"
          >
            <Plus className="w-5 h-5" />
            Oyuncu Ekle
          </button>
        )}

        <div className="text-slate-500 text-sm text-center mb-4">
          {players.length}/15 oyuncu
        </div>
      </div>

      <div className="max-w-md mx-auto w-full">
        <button
          onClick={onContinue}
          disabled={!canStart || hasEmpty}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
            canStart && !hasEmpty
              ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-lg shadow-red-500/30'
              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
          }`}
        >
          {!canStart ? `En az ${3 - players.length} oyuncu daha gerekli` : hasEmpty ? 'Tüm isimleri doldurun' : 'Devam Et'}
        </button>
      </div>
    </div>
  );
}

function CategorySelectScreen({
  selectedCategories,
  onToggleCategory,
  onContinue,
  onBack,
}: {
  selectedCategories: string[];
  onToggleCategory: (key: string) => void;
  onContinue: () => void;
  onBack: () => void;
}) {
  const canContinue = selectedCategories.length >= 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col p-4">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          Geri
        </button>
        <h1 className="text-2xl font-bold text-white">Kategoriler</h1>
        <div className="w-16" />
      </div>

      <div className="flex-1 max-w-md mx-auto w-full">
        <p className="text-slate-400 text-center mb-6">En az bir kategori seçin</p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {Object.entries(WORD_CATEGORIES).map(([key, category]) => {
            const isSelected = selectedCategories.includes(key);
            return (
              <button
                key={key}
                onClick={() => onToggleCategory(key)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  isSelected
                    ? 'bg-red-500/20 border-red-500 text-white'
                    : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{category.name}</span>
                  {isSelected && <Check className="w-5 h-5 text-red-400" />}
                </div>
                <span className="text-xs text-slate-500">{category.words.length} kelime</span>
              </button>
            );
          })}
        </div>

        <div className="text-slate-500 text-sm text-center mb-4">
          {selectedCategories.length} kategori seçildi
        </div>
      </div>

      <div className="max-w-md mx-auto w-full">
        <button
          onClick={onContinue}
          disabled={!canContinue}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
            canContinue
              ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-lg shadow-red-500/30'
              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
          }`}
        >
          {canContinue ? 'Devam Et' : 'En az bir kategori seçin'}
        </button>
      </div>
    </div>
  );
}

function SettingsScreen({
  playerCount,
  imposterCount,
  onImposterCountChange,
  hintEnabled,
  onHintToggle,
  timerEnabled,
  onTimerToggle,
  timerDuration,
  onTimerDurationChange,
  onContinue,
  onBack,
}: {
  playerCount: number;
  imposterCount: number;
  onImposterCountChange: (count: number) => void;
  hintEnabled: boolean;
  onHintToggle: () => void;
  timerEnabled: boolean;
  onTimerToggle: () => void;
  timerDuration: number;
  onTimerDurationChange: (duration: number) => void;
  onContinue: () => void;
  onBack: () => void;
}) {
  const maxImposters = Math.max(1, playerCount - 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col p-4">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          Geri
        </button>
        <h1 className="text-2xl font-bold text-white">Ayarlar</h1>
        <div className="w-16" />
      </div>

      <div className="flex-1 max-w-md mx-auto w-full space-y-6">
        {/* Imposter Count */}
        <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Skull className="w-6 h-6 text-red-500" />
              <span className="text-white font-medium">İmposter</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onImposterCountChange(Math.max(1, imposterCount - 1))}
                disabled={imposterCount <= 1}
                className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white flex items-center justify-center"
              >
                -
              </button>
              <span className="text-2xl font-bold text-white w-8 text-center ">{imposterCount}</span>
              <button
                onClick={() => onImposterCountChange(Math.min(maxImposters, imposterCount + 1))}
                disabled={imposterCount >= maxImposters}
                className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
          <p className="text-slate-500 text-sm">
            {playerCount - imposterCount} normal oyuncu{playerCount - imposterCount !== 1 ? '' : ''}
          </p>
        </div>

        {/* Hint Toggle */}
        <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-amber-500" />
              <div>
                <span className="text-white font-medium block">İmposter İpucu</span>
                <span className="text-slate-500 text-sm">İmposter olan kişiye kategori ipucu göster</span>
              </div>
            </div>
            <button
              onClick={onHintToggle}
              className={`w-14 h-8 rounded-full transition-colors relative ${
                hintEnabled ? 'bg-red-500' : 'bg-slate-600'
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform ${
                  hintEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Timer Toggle */}
        <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-blue-500" />
              <div>
                <span className="text-white font-medium block">Zamanlayıcı</span>
                <span className="text-slate-500 text-sm">
                  {timerEnabled ? `Tur başına ${timerDuration} saniye` : 'Sınırsız süre'}
                </span>
              </div>
            </div>
            <button
              onClick={onTimerToggle}
              className={`w-14 h-8 rounded-full transition-colors relative ${
                timerEnabled ? 'bg-blue-500' : 'bg-slate-600'
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform ${
                  timerEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {timerEnabled && (
            <div className="mt-4">
              <input
                type="range"
                min="10"
                max="120"
                step="5"
                value={timerDuration}
                onChange={(e) => onTimerDurationChange(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-slate-500 text-sm mt-2">
                <span>10sn</span>
                <span className="text-white font-medium">{timerDuration}sn</span>
                <span>120sn</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-md mx-auto w-full mt-6">
        <button
          onClick={onContinue}
          className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-lg shadow-red-500/30 transition-all"
        >
          Oyunu Başlat
        </button>
      </div>
    </div>
  );
}

function RoleRevealScreen({
  players,
  currentPlayerIndex,
  currentWord,
  currentCategoryHint,
  hintEnabled,
  onStartClueRound,
  onNextPlayer,
}: {
  players: Player[];
  currentPlayerIndex: number;
  currentWord: string;
  currentCategoryHint: string;
  hintEnabled: boolean;
  onStartClueRound: () => void;
  onNextPlayer: () => void;
}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const currentPlayer = players[currentPlayerIndex];
  const allHaveViewed = players.every((p) => p.hasViewedRole);

  useEffect(() => {
    setIsRevealed(false);
  }, [currentPlayerIndex]);

  const handleNext = () => {
    setIsRevealed(false);
    onNextPlayer();
  };

  const getContent = () => {
    if (!isRevealed) return null;
    if (currentPlayer.isImposter) {
      return {
        title: 'İmposter',
        subtitle: hintEnabled ? `İpucu: ${currentCategoryHint}` : null,
        icon: <Skull className="w-16 h-16 text-red-500" />,
      };
    }
    return {
      title: currentWord,
      subtitle: null,
      icon: <Eye className="w-16 h-16 text-green-500" />,
    };
  };

  const content = getContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="text-3xl font-bold text-white mb-2 text-center">
        {allHaveViewed ? 'Başlamaya hazır!' : `${currentPlayer.name}'in sırası`}
      </div>

      <div className="text-slate-400 mb-8 text-center">
        {allHaveViewed ? 'Herkes rolünü gördü' : `${currentPlayerIndex + 1}. oyuncu / ${players.length}`}
      </div>

      <div
        className={`w-full max-w-sm bg-slate-800/80 rounded-3xl p-8 border-2 transition-all duration-300 ${
          isRevealed ? 'border-slate-600' : 'border-red-500/50 shadow-lg shadow-red-500/20' 
        }`}
      >
        {!isRevealed ? (
          <div className="text-center">
            <div className="mb-6">
              <div className="bg-gradient-to-b from-slate-700 to-slate-800 rounded-xl mx-auto border border-slate-600 flex items-center justify-center"  
                style={{               
                height: '50vh',
              }}>
                <span className="text-4xl">?</span>
              </div>
            </div>
            <button
              onClick={() => setIsRevealed(true)}
              className="w-full py-4 bg-red-500 hover:bg-red-400 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Eye className="w-5 h-5" />
              Göster
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className=" flex justify-center">{content?.icon}</div>
            <h2 className={`text-2xl font-bold ${currentPlayer.isImposter ? 'text-red-500' : 'text-white'}`}>
              {content?.title}
            </h2>
            {content?.subtitle && <p className="text-slate-400 mb-6">{content.subtitle}</p>}

            <button
              onClick={handleNext}
              className="w-full py-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <EyeOff className="w-5 h-5" />
              {allHaveViewed ? 'İpucu Turuna Başla' : 'Sonraki Oyuncuya Geç'}
            </button>
          </div>
        )}
      </div>
      
    </div>
  );
}

function ClueRoundScreen({
  players,
  currentPlayerIndex,
  timerEnabled,
  timerDuration,
  onNextPlayer,
  onGoToResults,
}: {
  players: Player[];
  currentPlayerIndex: number;
  timerEnabled: boolean;
  timerDuration: number;
  onNextPlayer: () => void;
  onGoToResults: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState(timerDuration);
  const [roundCount, setRoundCount] = useState(1);
  const currentPlayer = players[currentPlayerIndex];

  useEffect(() => {
    if (!timerEnabled) return;

    setTimeLeft(timerDuration);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onNextPlayer();
          return timerDuration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPlayerIndex, timerEnabled, timerDuration, onNextPlayer]);

  const handleNext = () => {
    if (currentPlayerIndex === players.length - 1) {
      setRoundCount((prev) => prev + 1);
    }
    onNextPlayer();
  };

  const canShowResults = roundCount >= 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-slate-500">İpucu Turu</div>
        <div className="text-slate-400">Tur {roundCount}</div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-4xl font-bold text-white mb-4 text-center">{currentPlayer.name}</div>
        <div className="text-slate-400 mb-8">
          {currentPlayer.isStartingPlayer && (
            <span className="bg-amber-500/20 text-amber-400 px-2 py-1 rounded text-sm">Oyuna başlar</span>
          )}
        </div>

        {timerEnabled && (
          <div className="text-6xl font-bold mb-8 text-white">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        )}

        <p className="text-slate-400 text-center mb-8 max-w-md">
          Gizli kelimeyle ilgili tek kelimelik bir ipucu verin. Kurnaz ama çok belirsiz olmayın!
        </p>

        <button
          onClick={handleNext}
          className="w-full max-w-xs py-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 mb-4"
        >
          Sonraki Oyuncu
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-md mx-auto w-full">
        <button
          onClick={onGoToResults}
          disabled={!canShowResults}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
            canShowResults
              ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-lg shadow-red-500/30'
              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
          }`}
        >
          <Eye className="w-5 h-5 inline-block mr-2" />
          Sonuçları Göster
        </button>
        {!canShowResults && <p className="text-slate-500 text-sm text-center mt-2">En az bir tur tamamlayın</p>}
      </div>

    </div>
  );
}

function ResultsScreen({
  imposters,
  currentWord,
  onNewRound,
  onNewGame,
}: {
  imposters: Player[];
  currentWord: string;
  onNewRound: () => void;
  onNewGame: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🎭</div>
        <h1 className="text-4xl font-bold text-white mb-2">Oyun Bitti!</h1>
        <p className="text-slate-400">Gizli kelime ve sahte kişi(ler) açıklandı</p>
      </div>

      <div className="bg-slate-800/50 rounded-2xl p-6 max-w-sm w-full border border-slate-700 mb-6">
        <div className="text-center mb-4">
          <p className="text-slate-400 mb-1">Gizli kelime şuydu:</p>
          <p className="text-3xl font-bold text-white">{currentWord}</p>
        </div>

        <div className="border-t border-slate-600 pt-4">
          <p className="text-slate-400 mb-3">Sahte kişi(ler):</p>
          <div className="space-y-2">
            {imposters.map((imposter) => (
              <div
                key={imposter.id}
                className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg font-medium text-center"
              >
                {imposter.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4 max-w-sm w-full">
        <button
          onClick={onNewRound}
          className="flex-1 py-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-colors"
        >
          <RefreshCw className="w-5 h-5 inline-block mr-2" />
          Yeni Tur
        </button>
        <button
          onClick={onNewGame}
          className="flex-1 py-4 bg-red-500 hover:bg-red-400 text-white font-bold rounded-xl transition-colors"
        >
          Yeni Oyun
        </button>
      </div>
    </div>
  );
}

// ============================================
// MAIN APP
// ============================================

function App() {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    screen: 'mode-select',
    players: [],
    selectedCategories: [],
    imposterCount: 1,
    hintEnabled: true,
    timerEnabled: false,
    timerDuration: 30,
    currentWord: '',
    currentCategoryHint: '',
    currentPlayerIndex: 0,
    usedWords: [],
    isOnline: false,
  });

  // Player management
  const addPlayer = () => {
    if (gameState.players.length >= 15) return;
    setGameState((prev) => ({
      ...prev,
      players: [...prev.players, { id: generateId(), name: '', isImposter: false, isStartingPlayer: false, hasViewedRole: false }],
    }));
  };

  const removePlayer = (id: string) => {
    setGameState((prev) => ({
      ...prev,
      players: prev.players.filter((p) => p.id !== id),
    }));
  };

  const updatePlayerName = (id: string, name: string) => {
    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((p) => (p.id === id ? { ...p, name } : p)),
    }));
  };

  // Category selection
  const toggleCategory = (key: string) => {
    setGameState((prev) => {
      const isSelected = prev.selectedCategories.includes(key);
      return {
        ...prev,
        selectedCategories: isSelected
          ? prev.selectedCategories.filter((c) => c !== key)
          : [...prev.selectedCategories, key],
      };
    });
  };

  // Start game and assign roles
  const startGame = useCallback(() => {
    const playerIds = gameState.players.map((p) => p.id);
    const imposterIds = assignRoles(playerIds, gameState.imposterCount);

    // Get non-imposter IDs for starting player selection
    const nonImposterIds = playerIds.filter((id) => !imposterIds.has(id));
    const startingPlayerId = pickStartingPlayer(nonImposterIds);

    // Select word
    const wordResult = selectRandomWord(gameState.selectedCategories, gameState.usedWords);

    if (!wordResult) {
      // All words used, reset used words
      const resetWord = selectRandomWord(gameState.selectedCategories, []);
      if (!resetWord) return;
      setGameState((prev) => ({
        ...prev,
        players: prev.players.map((p) => ({
          ...p,
          isImposter: imposterIds.has(p.id),
          isStartingPlayer: p.id === startingPlayerId,
          hasViewedRole: false,
        })),
        currentPlayerIndex: prev.players.findIndex((p) => p.id === startingPlayerId),
        currentWord: resetWord.word,
        currentCategoryHint: resetWord.hint,
        usedWords: [resetWord.word],
        screen: 'role-reveal',
      }));
      return;
    }

    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((p) => ({
        ...p,
        isImposter: imposterIds.has(p.id),
        isStartingPlayer: p.id === startingPlayerId,
        hasViewedRole: false,
      })),
      currentPlayerIndex: prev.players.findIndex((p) => p.id === startingPlayerId),
      currentWord: wordResult.word,
      currentCategoryHint: wordResult.hint,
      usedWords: [...prev.usedWords, wordResult.word],
      screen: 'role-reveal',
    }));
  }, [gameState.players, gameState.imposterCount, gameState.selectedCategories, gameState.usedWords]);

  // Role reveal navigation
  const nextPlayer = () => {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    const updatedPlayers = gameState.players.map((p) =>
      p.id === currentPlayer.id ? { ...p, hasViewedRole: true } : p
    );

    const allHaveViewed = updatedPlayers.every((p) => p.hasViewedRole);

    if (allHaveViewed) {
      // Find starting player for clue round
      const startingIndex = updatedPlayers.findIndex((p) => p.isStartingPlayer);
      setGameState((prev) => ({
        ...prev,
        players: updatedPlayers,
        currentPlayerIndex: startingIndex,
        screen: 'clue-round',
      }));
    } else {
      setGameState((prev) => ({
        ...prev,
        players: updatedPlayers,
        currentPlayerIndex: (prev.currentPlayerIndex + 1) % prev.players.length,
      }));
    }
  };

  // Clue round navigation
  const nextCluePlayer = () => {
    setGameState((prev) => ({
      ...prev,
      currentPlayerIndex: (prev.currentPlayerIndex + 1) % prev.players.length,
    }));
  };

  // New round/game
  const newRound = () => {
    startGame();
  };

  const newGame = () => {
    setGameState({
      screen: 'player-setup',
      players: gameState.players.map((p) => ({
        ...p,
        isImposter: false,
        isStartingPlayer: false,
        hasViewedRole: false,
      })),
      selectedCategories: gameState.selectedCategories,
      imposterCount: gameState.imposterCount,
      hintEnabled: gameState.hintEnabled,
      timerEnabled: gameState.timerEnabled,
      timerDuration: gameState.timerDuration,
      currentWord: '',
      currentCategoryHint: '',
      currentPlayerIndex: 0,
      usedWords: gameState.usedWords,
      isOnline: false,
    });
  };

  const imposters = gameState.players.filter((p) => p.isImposter);

  // Render current screen
  switch (gameState.screen) {
    case 'mode-select':
      return (
        <>
          <ModeSelectScreen
            onSelectSingle={() => setGameState((prev) => ({ ...prev, screen: 'player-setup' }))}
            onSelectOnline={() => setShowComingSoon(true)}
          />
          {showComingSoon && <ComingSoonModal onClose={() => setShowComingSoon(false)} />}
        </>
      );

    case 'player-setup':
      return (
        <PlayerSetupScreen
          players={gameState.players}
          onAddPlayer={addPlayer}
          onRemovePlayer={removePlayer}
          onUpdatePlayerName={updatePlayerName}
          onContinue={() => setGameState((prev) => ({ ...prev, screen: 'category-select' }))}
          onBack={() => setGameState((prev) => ({ ...prev, screen: 'mode-select' }))}
        />
      );

    case 'category-select':
      return (
        <CategorySelectScreen
          selectedCategories={gameState.selectedCategories}
          onToggleCategory={toggleCategory}
          onContinue={() => setGameState((prev) => ({ ...prev, screen: 'settings' }))}
          onBack={() => setGameState((prev) => ({ ...prev, screen: 'player-setup' }))}
        />
      );

    case 'settings':
      return (
        <SettingsScreen
          playerCount={gameState.players.length}
          imposterCount={gameState.imposterCount}
          onImposterCountChange={(count) =>
            setGameState((prev) => ({ ...prev, imposterCount: count }))
          }
          hintEnabled={gameState.hintEnabled}
          onHintToggle={() =>
            setGameState((prev) => ({ ...prev, hintEnabled: !prev.hintEnabled }))
          }
          timerEnabled={gameState.timerEnabled}
          onTimerToggle={() =>
            setGameState((prev) => ({ ...prev, timerEnabled: !prev.timerEnabled }))
          }
          timerDuration={gameState.timerDuration}
          onTimerDurationChange={(duration) =>
            setGameState((prev) => ({ ...prev, timerDuration: duration }))
          }
          onContinue={startGame}
          onBack={() => setGameState((prev) => ({ ...prev, screen: 'category-select' }))}
        />
      );

    case 'role-reveal':
      return (
        <RoleRevealScreen
          players={gameState.players}
          currentPlayerIndex={gameState.currentPlayerIndex}
          currentWord={gameState.currentWord}
          currentCategoryHint={gameState.currentCategoryHint}
          hintEnabled={gameState.hintEnabled}
          onStartClueRound={() => setGameState((prev) => ({ ...prev, screen: 'clue-round' }))}
          onNextPlayer={nextPlayer}
        />
      );

    case 'clue-round':
      return (
        <ClueRoundScreen
          players={gameState.players}
          currentPlayerIndex={gameState.currentPlayerIndex}
          timerEnabled={gameState.timerEnabled}
          timerDuration={gameState.timerDuration}
          onNextPlayer={nextCluePlayer}
          onGoToResults={() => setGameState((prev) => ({ ...prev, screen: 'results' }))}
        />
      );

    case 'results':
      return (
        <ResultsScreen
          imposters={imposters}
          currentWord={gameState.currentWord}
          onNewRound={newRound}
          onNewGame={newGame}
        />
      );

    default:
      return null;
  }
}

// TODO: Online mod entegrasyonu buraya geliyor — WebSocket/Firebase tabanlı oda sistemi
// gerçek zamanlı çok oyunculu destek için düşünülmektedir.

export default App;
