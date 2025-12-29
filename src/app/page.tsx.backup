'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { challengeDays, getCompletionPercentage } from '@/lib/data/challengeDays'
import { translations, getTranslations, type Language } from '@/lib/translations'
import { Sparkles, BookOpen, Calendar, Heart, Sun, Moon, Target, Award, ChevronRight, CheckCircle2, Star, Smile, Droplets, Clock, Flame, Flower2, Crown, Home, Book, PenLine, TrendingUp, User, Settings, Lock, Globe } from 'lucide-react'

type TabValue = 'onboarding' | 'language' | 'dashboard' | 'challenge' | 'journal' | 'trackers' | 'routine' | 'vision' | 'bonus' | 'settings'

interface JournalEntry {
  id: string
  date: Date
  content: string
  feeling?: string
  glowMoment?: string
  learning?: string
}

interface DailyTrackerData {
  hydration: number
  hydrationGoal: number
  sleepHours?: number
  sleepQuality?: string
  mood?: string
  activity?: string
  activityMinutes?: number
  skincareDone: boolean
}

interface RoutineItem {
  id: string
  title: string
  description?: string
  time?: string
  completed: boolean
}

interface VisionImage {
  id: string
  url: string
  caption?: string
}

// Fonction utilitaire pour obtenir la date d'aujourd'hui en format YYYY-MM-DD
const getTodayKey = () => {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

// Fonction pour calculer le jour du challenge basé sur la date de début
const calculateCurrentDay = (startDate: string | null) => {
  if (!startDate) return 1
  const start = new Date(startDate)
  const today = new Date()
  const diffTime = Math.abs(today.getTime() - start.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1
  return Math.min(diffDays, 30)
}

export default function GlowUpApp() {
  const [currentTab, setCurrentTab] = useState<TabValue>('onboarding')
  const [lang, setLang] = useState<Language>('fr')
  const [hasStarted, setHasStarted] = useState(false)
  const [challengeStartDate, setChallengeStartDate] = useState<string | null>(null)
  const [currentDay, setCurrentDay] = useState(1)
  const [completedDays, setCompletedDays] = useState<number[]>([])
  const [dayNotes, setDayNotes] = useState<Record<number, string>>({})
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([])
  const [newJournalContent, setNewJournalContent] = useState('')
  const [guidedAnswers, setGuidedAnswers] = useState({
    feeling: '',
    glowMoment: '',
    learning: ''
  })
  const [dailyTracker, setDailyTracker] = useState<DailyTrackerData>({
    hydration: 0,
    hydrationGoal: 8,
    sleepHours: undefined,
    sleepQuality: undefined,
    mood: undefined,
    activity: undefined,
    activityMinutes: undefined,
    skincareDone: false
  })
  const [routineItems, setRoutineItems] = useState<RoutineItem[]>([
    { id: '1', title: 'Hydratation matinale', description: 'Verre d\'eau au réveil', completed: false },
    { id: '2', title: 'Skincare routine', description: 'Nettoyage + hydratation', completed: false },
    { id: '3', title: 'Mouvement doux', description: '10 minutes de marche ou yoga', completed: false },
    { id: '4', title: 'Journaling', description: 'Écrire ses pensées', completed: false },
    { id: '5', title: 'Intention du jour', description: 'Définir son intention', completed: false }
  ])
  const [visionImages, setVisionImages] = useState<VisionImage[]>([])
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [notifications, setNotifications] = useState(true)
  const [openChecklist, setOpenChecklist] = useState<string | null>(null)
  const [openGuide, setOpenGuide] = useState<string | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationDay, setCelebrationDay] = useState(1)

  // Translation helper
  const t = translations[lang]

  const completionPercentage = getCompletionPercentage(completedDays)

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('glowUpLanguage') as Language | null
    if (savedLang) {
      setLang(savedLang)
    }
  }, [])

  // Calcul du jour actuel basé sur la date
  useEffect(() => {
    if (challengeStartDate) {
      const calculatedDay = calculateCurrentDay(challengeStartDate)
      setCurrentDay(calculatedDay)
    }
  }, [challengeStartDate])

  // Charger toutes les données depuis localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('glowUpApp')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        
        // Load saved language first
        if (parsed.lang) {
          setLang(parsed.lang)
        }
        
        if (parsed.hasStarted) {
          setHasStarted(true)
          setChallengeStartDate(parsed.challengeStartDate)
          setCompletedDays(parsed.completedDays || [])
          setDayNotes(parsed.dayNotes || {})
          setJournalEntries(parsed.journalEntries || [])
          setVisionImages(parsed.visionImages || [])
          setTheme(parsed.theme || 'light')
          setNotifications(parsed.notifications !== false)

          // Charger les données du jour actuel
          const todayKey = getTodayKey()
          if (parsed.dailyData && parsed.dailyData[todayKey]) {
            const dayData = parsed.dailyData[todayKey]
            setDailyTracker(dayData.tracker || dailyTracker)
            setRoutineItems(dayData.routine || routineItems)
          }
        }
      } catch (e) {
        console.error('Erreur lors du chargement des données:', e)
      }
    }
  }, [])

  // Sauvegarder toutes les données dans localStorage
  useEffect(() => {
    const todayKey = getTodayKey()
    const data = {
      lang,
      hasStarted,
      challengeStartDate,
      completedDays,
      dayNotes,
      journalEntries,
      visionImages,
      theme,
      notifications,
      dailyData: {
        [todayKey]: {
          tracker: dailyTracker,
          routine: routineItems
        }
      }
    }
    localStorage.setItem('glowUpApp', JSON.stringify(data))
  }, [lang, hasStarted, challengeStartDate, completedDays, dayNotes, journalEntries, visionImages, theme, notifications, dailyTracker, routineItems])

  const handleStartChallenge = () => {
    const startDate = new Date().toISOString()
    setChallengeStartDate(startDate)
    setHasStarted(true)
    setCurrentTab('dashboard')
  }

  const handleCompleteDay = (dayId: number) => {
    if (!completedDays.includes(dayId)) {
      const newCompleted = [...completedDays, dayId].sort((a, b) => a - b)
      setCompletedDays(newCompleted)
      setCelebrationDay(dayId)
      setShowCelebration(true)

      // Réinitialiser les trackers pour le nouveau jour (si pas le dernier jour)
      if (dayId < 30) {
        const newDay = dayId + 1
        const calculatedCurrentDay = calculateCurrentDay(challengeStartDate!)

        // Attendre un peu avant de mettre à jour currentDay
        setTimeout(() => {
          if (calculatedCurrentDay >= newDay) {
            setCurrentDay(newDay)
            // Reset trackers for new day
            setDailyTracker({
              hydration: 0,
              hydrationGoal: 8,
              sleepHours: undefined,
              sleepQuality: undefined,
              mood: undefined,
              activity: undefined,
              activityMinutes: undefined,
              skincareDone: false
            })
            setRoutineItems([
              { id: '1', title: 'Hydratation matinale', description: 'Verre d\'eau au réveil', completed: false },
              { id: '2', title: 'Skincare routine', description: 'Nettoyage + hydratation', completed: false },
              { id: '3', title: 'Mouvement doux', description: '10 minutes de marche ou yoga', completed: false },
              { id: '4', title: 'Journaling', description: 'Écrire ses pensées', completed: false },
              { id: '5', title: 'Intention du jour', description: 'Définir son intention', completed: false }
            ])
          }
        }, 3000)
      }
    }
  }

  const handleSaveJournalEntry = () => {
    if (newJournalContent.trim()) {
      const entry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date(),
        content: newJournalContent,
        feeling: guidedAnswers.feeling || undefined,
        glowMoment: guidedAnswers.glowMoment || undefined,
        learning: guidedAnswers.learning || undefined
      }
      setJournalEntries([entry, ...journalEntries])
      setNewJournalContent('')
      setGuidedAnswers({ feeling: '', glowMoment: '', learning: '' })

      // Marquer le journal comme complété dans la routine
      setRoutineItems(items =>
        items.map(item =>
          item.id === '4' ? { ...item, completed: true } : item
        )
      )
    }
  }

  const toggleRoutineItem = (id: string) => {
    setRoutineItems(items =>
      items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  // Vérifier si un jour est accessible
  const isDayAccessible = (dayId: number) => {
    const calculatedCurrentDay = calculateCurrentDay(challengeStartDate)
    return dayId <= calculatedCurrentDay || completedDays.includes(dayId)
  }

  // Obtenir le jour maximum accessible
  const getMaxAccessibleDay = () => {
    const calculatedCurrentDay = calculateCurrentDay(challengeStartDate)
    return calculatedCurrentDay
  }

  const handleLanguageSelect = (selectedLang: Language) => {
    setLang(selectedLang)
    setCurrentTab('dashboard')
  }

  const renderOnboarding = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 dark:from-stone-900 dark:via-rose-950 dark:to-stone-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg border-none shadow-2xl bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-200 to-rose-200 dark:from-amber-600 dark:to-rose-600 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-amber-700 dark:text-amber-100" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
            {t.appTitle}
          </CardTitle>
          <CardDescription className="text-lg mt-2 text-amber-800 dark:text-amber-200">
            {t.appSubtitle}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="text-center space-y-4">
            <p className="text-lg font-medium italic text-amber-900 dark:text-amber-100 leading-relaxed">
              « {t.inspirationalQuote} »
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 text-center">
              {t.whatYouDiscover}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-amber-50 to-rose-50 dark:from-stone-700 dark:to-rose-900/30 rounded-lg">
                <Flower2 className="w-8 h-8 text-rose-500 mb-2 mx-auto" />
                <p className="text-sm text-center text-amber-800 dark:text-amber-200">{t.beautySelfcare}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-amber-50 to-rose-50 dark:from-stone-700 dark:to-rose-900/30 rounded-lg">
                <Crown className="w-8 h-8 text-amber-500 mb-2 mx-auto" />
                <p className="text-sm text-center text-amber-800 dark:text-amber-200">{t.mindsetConfidence}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-amber-50 to-rose-50 dark:from-stone-700 dark:to-rose-900/30 rounded-lg">
                <Heart className="w-8 h-8 text-rose-500 mb-2 mx-auto" />
                <p className="text-sm text-center text-amber-800 dark:text-amber-200">{t.balanceHarmony}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-amber-50 to-rose-50 dark:from-stone-700 dark:to-rose-900/30 rounded-lg">
                <Star className="w-8 h-8 text-amber-500 mb-2 mx-auto" />
                <p className="text-sm text-center text-amber-800 dark:text-amber-200">{t.lifestyleGlow}</p>
              </div>
            </div>
          </div>

          <div className="text-center space-y-3">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              {t.features.weeks}
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              {t.features.actions}
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              {t.features.journal}
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              {t.features.affirmations}
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              {t.features.dailyUnlock}
            </p>
          </div>

          <Button
            onClick={handleStartChallenge}
            className="w-full py-6 text-lg bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {t.startChallenge}
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderLanguageSelector = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 dark:from-stone-900 dark:via-rose-950 dark:to-stone-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg border-none shadow-2xl bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-200 to-rose-200 dark:from-amber-600 dark:to-rose-600 flex items-center justify-center">
              <Globe className="w-10 h-10 text-amber-700 dark:text-amber-100" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
            Choose Language / Choissez votre langue
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-lg font-medium italic text-amber-900 dark:text-amber-100">
              Sélectionnez votre langue pour continuer / Select your language to continue
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {/* French */}
              <Button
                onClick={() => handleLanguageSelect('fr')}
                className={`w-full py-8 text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 ${
                  lang === 'fr'
                    ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white'
                    : 'bg-gradient-to-r from-amber-100 to-rose-100 dark:from-amber-900 dark:to-rose-900 hover:from-amber-200 dark:hover:to-rose-800 text-amber-800 dark:text-amber-200'
                }`}
              >
                <div className="text-center space-y-2">
                  <div className="text-4xl">🇫🇷</div>
                  <div className="text-2xl font-bold">Français</div>
                  <div className="text-sm">Français</div>
                </div>
              </Button>

              {/* English */}
              <Button
                onClick={() => handleLanguageSelect('en')}
                className={`w-full py-8 text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 ${
                  lang === 'en'
                    ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white'
                    : 'bg-gradient-to-r from-amber-100 to-rose-100 dark:from-amber-900 dark:to-rose-900 hover:from-amber-200 dark:hover:to-rose-800 text-amber-800 dark:text-amber-200'
                }`}
              >
                <div className="text-center space-y-2">
                  <div className="text-4xl">🇬🇧</div>
                  <div className="text-2xl font-bold">English</div>
                  <div className="text-sm">English</div>
                </div>
              </Button>

              {/* Spanish */}
              <Button
                onClick={() => handleLanguageSelect('es')}
                className={`w-full py-8 text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 ${
                  lang === 'es'
                    ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white'
                    : 'bg-gradient-to-r from-amber-100 to-rose-100 dark:from-amber-900 dark:to-rose-900 hover:from-amber-200 dark:hover:to-rose-800 text-amber-800 dark:text-amber-200'
                }`}
              >
                <div className="text-center space-y-2">
                  <div className="text-4xl">🇪🇸</div>
                  <div className="text-2xl font-bold">Español</div>
                  <div className="text-sm">Español</div>
                </div>
              </Button>
            </div>
          </div>

          <div className="text-center space-y-3 mt-8">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              ✓ Your language preference will be saved
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              ✓ Your progress and data will be preserved
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              ✓ You can change language anytime from Settings
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderDashboard = () => {
    const today = new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : lang === 'es' ? 'es-ES' : 'en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    })

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 dark:from-stone-900 dark:via-rose-950 dark:to-stone-900 p-4 pb-32">
        <div className="max-w-md mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-2 pt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-stone-800/60 rounded-full shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
                {today}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
              {t.dashboard}
            </h1>
          </div>

          {/* Progress Card */}
          <Card className="border-none shadow-lg bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-amber-900 dark:text-amber-100">{t.progressMonth}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-amber-700 dark:text-amber-300">{t.completion}</span>
                  <span className="font-semibold text-amber-900 dark:text-amber-100">{completionPercentage}%</span>
                </div>
                <Progress value={completionPercentage} className="h-3" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-rose-500" />
                  <span className="text-amber-700 dark:text-amber-300">
                    {completedDays.length} {t.daysCompleted}
                  </span>
                </div>
                <Badge variant="secondary" className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
                  {30 - completedDays.length} {t.daysRemaining}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Card
              className="border-none shadow-md bg-gradient-to-br from-amber-100 to-rose-100 dark:from-amber-900/50 dark:to-rose-900/50 cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setCurrentTab('challenge')}
            >
              <CardContent className="p-4 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-white/70 dark:bg-stone-700/70 flex items-center justify-center mx-auto">
                  <Calendar className="w-6 h-6 text-amber-600 dark:text-amber-300" />
                </div>
                <p className="font-semibold text-sm text-amber-900 dark:text-amber-100">{t.todayChallenge}</p>
                <Badge className="bg-white/90 dark:bg-stone-700/90 text-amber-700 dark:text-amber-300 text-xs">
                  {t.day} {currentDay}
                </Badge>
              </CardContent>
            </Card>

            <Card
              className="border-none shadow-md bg-gradient-to-br from-rose-100 to-orange-100 dark:from-rose-900/50 dark:to-orange-900/50 cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setCurrentTab('journal')}
            >
              <CardContent className="p-4 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-white/70 dark:bg-stone-700/70 flex items-center justify-center mx-auto">
                  <BookOpen className="w-6 h-6 text-rose-600 dark:text-rose-300" />
                </div>
                <p className="font-semibold text-sm text-rose-900 dark:text-rose-100">{t.myJournal}</p>
                <Badge className="bg-white/90 dark:bg-stone-700/90 text-rose-700 dark:text-rose-300 text-xs">
                  {journalEntries.length} {t.entries}
                </Badge>
              </CardContent>
            </Card>

            <Card
              className="border-none shadow-md bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/50 dark:to-amber-900/50 cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setCurrentTab('trackers')}
            >
              <CardContent className="p-4 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-white/70 dark:bg-stone-700/70 flex items-center justify-center mx-auto">
                  <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-300" />
                </div>
                <p className="font-semibold text-sm text-orange-900 dark:text-orange-100">{t.trackers}</p>
                <Badge className="bg-white/90 dark:bg-stone-700/90 text-orange-700 dark:text-orange-300 text-xs">
                  {t.hydration}: {dailyTracker.hydration}/{dailyTracker.hydrationGoal}
                </Badge>
              </CardContent>
            </Card>

            <Card
              className="border-none shadow-md bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setCurrentTab('routine')}
            >
              <CardContent className="p-4 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-white/70 dark:bg-stone-700/70 flex items-center justify-center mx-auto">
                  <Sun className="w-6 h-6 text-amber-600 dark:text-amber-300" />
                </div>
                <p className="font-semibold text-sm text-amber-900 dark:text-amber-100">{t.myRoutine}</p>
                <Badge className="bg-white/90 dark:bg-stone-700/90 text-amber-700 dark:text-amber-300 text-xs">
                  {routineItems.filter(i => i.completed).length}/5
                </Badge>
              </CardContent>
            </Card>

            <Card
              className="border-none shadow-md bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/50 dark:to-pink-900/50 cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setCurrentTab('vision')}
            >
              <CardContent className="p-4 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-white/70 dark:bg-stone-700/70 flex items-center justify-center mx-auto">
                  <Star className="w-6 h-6 text-rose-600 dark:text-rose-300" />
                </div>
                <p className="font-semibold text-sm text-rose-900 dark:text-rose-100">{t.visionBoard}</p>
                <Badge className="bg-white/90 dark:bg-stone-700/90 text-rose-700 dark:text-rose-300 text-xs">
                  {visionImages.length} {t.images}
                </Badge>
              </CardContent>
            </Card>

            <Card
              className="border-none shadow-md bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/50 dark:to-yellow-900/50 cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setCurrentTab('bonus')}
            >
              <CardContent className="p-4 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-white/70 dark:bg-stone-700/70 flex items-center justify-center mx-auto">
                  <Crown className="w-6 h-6 text-amber-600 dark:text-amber-300" />
                </div>
                <p className="font-semibold text-sm text-amber-900 dark:text-amber-100">{t.bonus}</p>
                <Badge className="bg-white/90 dark:bg-stone-700/90 text-amber-700 dark:text-amber-300 text-xs">
                  {t.resources}
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Today's Affirmation */}
          <Card className="border-none shadow-lg bg-gradient-to-br from-rose-100/80 to-amber-100/80 dark:from-rose-900/30 dark:to-amber-900/30 backdrop-blur-sm">
            <CardContent className="p-6 text-center space-y-3">
              <Star className="w-6 h-6 text-amber-500 mx-auto" />
              <p className="text-lg font-medium italic text-amber-900 dark:text-amber-100">
                « {challengeDays[currentDay - 1]?.affirmation} »
              </p>
              <Badge className="bg-rose-200/50 dark:bg-rose-800/50 text-rose-800 dark:text-rose-200">
                {t.dailyAffirmation}
              </Badge>
            </CardContent>
          </Card>

          {/* Motivation */}
          <Card className="border-none shadow-md bg-white/60 dark:bg-stone-800/60 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-amber-700 dark:text-amber-300">
                {t.motivation}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const renderChallenge = () => {
    const maxAccessibleDay = getMaxAccessibleDay()
    const day = challengeDays.find(d => d.id === currentDay)

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 dark:from-stone-900 dark:via-rose-950 dark:to-stone-900 p-4 pb-32">
        <div className="max-w-md mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-2 pt-8">
            <h1 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
              {t.challenge30Days}
            </h1>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              {t.week} {Math.ceil(currentDay / 7)} - {t.resetCleaning}
            </p>
          </div>

          {/* Day Selector */}
          <ScrollArea className="h-16 w-full rounded-lg border border-amber-200 dark:border-amber-800 bg-white/60 dark:bg-stone-800/60">
            <div className="flex gap-2 p-2">
              {challengeDays.map((d) => {
                const isAccessible = isDayAccessible(d.id)
                const isLocked = !isAccessible && !completedDays.includes(d.id)

                return (
                  <button
                    key={d.id}
                    onClick={() => isAccessible && setCurrentDay(d.id)}
                    disabled={isLocked}
                    className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                      currentDay === d.id
                        ? 'bg-gradient-to-br from-amber-400 to-rose-400 text-white shadow-md'
                        : completedDays.includes(d.id)
                        ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300'
                        : isLocked
                        ? 'bg-gray-100 dark:bg-stone-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        : 'bg-white dark:bg-stone-700 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-stone-600'
                    }`}
                    title={isLocked ? t.lockedDay : ''}
                  >
                    {isLocked ? <Lock className="w-4 h-4" /> : completedDays.includes(d.id) ? <CheckCircle2 className="w-5 h-5" /> : d.id}
                  </button>
                )
              })}
            </div>
          </ScrollArea>

          {/* Locked Message */}
          {currentDay > maxAccessibleDay && !completedDays.includes(currentDay) && (
            <Card className="border-none shadow-md bg-amber-100/50 dark:bg-amber-900/30 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Lock className="w-8 h-8 text-amber-600 dark:text-amber-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                  {t.lockedDay}
                </p>
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                  {t.comeBackTomorrow}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Day Content */}
          {day && (currentDay <= maxAccessibleDay || completedDays.includes(currentDay)) && (
            <Card className="border-none shadow-lg bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
                    {t.day} {day.id}
                  </Badge>
                  {completedDays.includes(day.id) && (
                    <Badge className="bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {t.completedDay}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl text-amber-900 dark:text-amber-100">{day.title}</CardTitle>
                <CardDescription className="text-amber-700 dark:text-amber-300">{day.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Affirmation */}
                <div className="p-4 bg-gradient-to-r from-amber-50 to-rose-50 dark:from-amber-900/30 dark:to-rose-900/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-700 dark:text-amber-300 mb-1">{t.dailyAffirmationLabel}</p>
                      <p className="text-base font-semibold text-amber-900 dark:text-amber-100 italic">
                        « {day.affirmation} »
                      </p>
                    </div>
                  </div>
                </div>

                {/* Full Text */}
                <div>
                  <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
                    {day.fullText}
                  </p>
                </div>

                {day.isReviewDay && day.reviewQuestions && (
                  <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg space-y-3">
                    <h4 className="font-semibold text-rose-900 dark:text-rose-100">{t.whatYouDiscover}</h4>
                    {day.reviewQuestions.map((question, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-rose-200 dark:bg-rose-800 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-semibold text-rose-800 dark:text-rose-200">{idx + 1}</span>
                        </div>
                        <p className="text-sm text-rose-800 dark:text-rose-200">{question}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100">{t.actionsToday}</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center flex-shrink-0">
                        <Flower2 className="w-4 h-4 text-amber-600 dark:text-amber-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-amber-900 dark:text-amber-100">{t.beautyAction}</p>
                        <p className="text-sm text-amber-700 dark:text-amber-300">{day.beauty}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-800 flex items-center justify-center flex-shrink-0">
                        <Crown className="w-4 h-4 text-rose-600 dark:text-rose-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-rose-900 dark:text-rose-100">{t.mentalAction}</p>
                        <p className="text-sm text-rose-700 dark:text-rose-300">{day.mental}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-800 flex items-center justify-center flex-shrink-0">
                        <Sun className="w-4 h-4 text-orange-600 dark:text-orange-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-orange-900 dark:text-orange-100">{t.lifestyleAction}</p>
                        <p className="text-sm text-orange-700 dark:text-orange-300">{day.lifestyle}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label className="text-amber-900 dark:text-amber-100">{t.notesToday}</Label>
                  <Textarea
                    placeholder={t.notesPlaceholder}
                    value={dayNotes[currentDay] || ''}
                    onChange={(e) => setDayNotes({ ...dayNotes, [currentDay]: e.target.value })}
                    className="min-h-[100px] bg-amber-50/50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100"
                  />
                </div>

                {/* Complete Button */}
                {!completedDays.includes(currentDay) && (
                  <Button
                    onClick={() => handleCompleteDay(currentDay)}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    {t.completedDay2}
                  </Button>
                )}

                {completedDays.includes(currentDay) && (
                  <div className="text-center p-4 bg-rose-100 dark:bg-rose-900/30 rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-rose-700 dark:text-rose-300">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="font-semibold">{t.youCompleted} {celebrationDay} ! {t.congratulations} 💖</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    )
  }

  const renderJournal = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 dark:from-stone-900 dark:via-rose-950 dark:to-stone-900 p-4 pb-32">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 pt-8">
          <h1 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
            {t.journalTitle}
          </h1>
          <p className="text-sm text-amber-700 dark:text-amber-300">
            {t.journalSubtitle} - {t.day} {currentDay} / 30
          </p>
        </div>

        {/* New Entry Card */}
        <Card className="border-none shadow-lg bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-amber-900 dark:text-amber-100">{t.newEntry}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Guided Questions */}
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <Label className="text-sm text-amber-700 dark:text-amber-300">
                  {t.feelingQuestion}
                </Label>
                <Input
                  placeholder={t.feelingPlaceholder}
                  value={guidedAnswers.feeling}
                  onChange={(e) => setGuidedAnswers({ ...guidedAnswers, feeling: e.target.value })}
                  className="mt-2 bg-white/50 dark:bg-stone-700/50 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100"
                />
              </div>

              <div className="p-3 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                <Label className="text-sm text-rose-700 dark:text-rose-300">
                  {t.glowMomentQuestion}
                </Label>
                <Input
                  placeholder={t.glowMomentPlaceholder}
                  value={guidedAnswers.glowMoment}
                  onChange={(e) => setGuidedAnswers({ ...guidedAnswers, glowMoment: e.target.value })}
                  className="mt-2 bg-white/50 dark:bg-stone-700/50 border-rose-200 dark:border-rose-800 text-amber-900 dark:text-amber-100"
                />
              </div>

              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <Label className="text-sm text-orange-700 dark:text-orange-300">
                  {t.learningQuestion}
                </Label>
                <Input
                  placeholder={t.learningPlaceholder}
                  value={guidedAnswers.learning}
                  onChange={(e) => setGuidedAnswers({ ...guidedAnswers, learning: e.target.value })}
                  className="mt-2 bg-white/50 dark:bg-stone-700/50 border-orange-200 dark:border-orange-800 text-amber-900 dark:text-amber-100"
                />
              </div>
            </div>

            {/* Free Journal */}
            <div className="space-y-2">
              <Label className="text-amber-900 dark:text-amber-100">{t.freeJournal}</Label>
              <Textarea
                placeholder={t.journalPlaceholder}
                value={newJournalContent}
                onChange={(e) => setNewJournalContent(e.target.value)}
                className="min-h-[150px] bg-amber-50/50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100"
              />
            </div>

            <Button
              onClick={handleSaveJournalEntry}
              disabled={!newJournalContent.trim()}
              className="w-full bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              {t.save}
            </Button>
          </CardContent>
        </Card>

        {/* History */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-amber-900 dark:text-amber-100">{t.history}</h2>
          {journalEntries.length === 0 ? (
            <Card className="border-none shadow-md bg-white/60 dark:bg-stone-800/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-12 h-12 text-amber-300 dark:text-amber-700 mx-auto mb-3" />
                <p className="text-amber-700 dark:text-amber-300">{t.noEntries}</p>
                <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
                  {t.noEntriesDesc}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {journalEntries.map((entry) => (
                <Card
                  key={entry.id}
                  className="border-none shadow-md bg-white/60 dark:bg-stone-800/60 backdrop-blur-sm"
                >
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-xs">
                        {new Date(entry.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : lang === 'es' ? 'es-ES' : 'en-US', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </Badge>
                    </div>
                  </div>
                  {entry.feeling && (
                    <div className="text-sm text-amber-700 dark:text-amber-300">
                      <span className="font-medium">{t.feeling}:</span> {entry.feeling}
                    </div>
                  )}
                  {entry.glowMoment && (
                    <div className="text-sm text-rose-700 dark:text-rose-300">
                      <span className="font-medium">{t.glowMoment}:</span> {entry.glowMoment}
                    </div>
                  )}
                  {entry.learning && (
                    <div className="text-sm text-orange-700 dark:text-orange-300">
                      <span className="font-medium">{t.learning}:</span> {entry.learning}
                    </div>
                  )}
                  {entry.content && (
                    <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                      {entry.content}
                    </p>
                  )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderTrackers = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 dark:from-stone-900 dark:via-rose-950 dark:to-stone-900 p-4 pb-32">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 pt-8">
          <h1 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
            {t.trackersTitle}
          </h1>
          <p className="text-sm text-amber-700 dark:text-amber-300">
            {t.trackersSubtitle} - {t.day} {currentDay} / 30
          </p>
        </div>

        {/* Hydration Tracker */}
        <Card className="border-none shadow-lg bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-amber-900 dark:text-amber-100 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-400" />
                {t.hydration}
              </CardTitle>
              <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                {dailyTracker.hydration}/{dailyTracker.hydrationGoal} {t.glasses}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress
              value={(dailyTracker.hydration / dailyTracker.hydrationGoal) * 100}
              className="h-3"
            />
            <div className="flex justify-center gap-2 flex-wrap">
              {Array.from({ length: dailyTracker.hydrationGoal }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setDailyTracker({
                    ...dailyTracker,
                    hydration: idx + 1
                  })}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    idx < dailyTracker.hydration
                      ? 'bg-gradient-to-br from-blue-400 to-cyan-400 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-stone-700 text-gray-400 hover:bg-gray-200 dark:hover:bg-stone-600'
                  }`}
                >
                  {idx < dailyTracker.hydration && <Droplets className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sleep Tracker */}
        <Card className="border-none shadow-lg bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-amber-900 dark:text-amber-100 flex items-center gap-2">
              <Moon className="w-5 h-5 text-indigo-400" />
              {t.sleep}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-amber-700 dark:text-amber-300">{t.sleepHours}</Label>
              <Input
                type="number"
                placeholder="8"
                value={dailyTracker.sleepHours || ''}
                onChange={(e) => setDailyTracker({
                  ...dailyTracker,
                  sleepHours: parseFloat(e.target.value) || undefined
                })}
                className="mt-2 bg-amber-50/50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
              />
            </div>
            <div>
              <Label className="text-amber-700 dark:text-amber-300">{t.sleepQuality}</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {['😴', '😐', '😊', '😄'].map((emoji, idx) => (
                  <button
                    key={idx}
                    onClick={() => setDailyTracker({
                      ...dailyTracker,
                      sleepQuality: [t.badSleep, t.average, t.goodSleep, t.excellent][idx]
                    })}
                    className={`p-3 rounded-lg text-2xl transition-all ${
                      dailyTracker.sleepQuality === [t.badSleep, t.average, t.goodSleep, t.excellent][idx]
                        ? 'bg-indigo-100 dark:bg-indigo-900/30 ring-2 ring-indigo-400'
                        : 'bg-gray-50 dark:bg-stone-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mood Tracker */}
        <Card className="border-none shadow-lg bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-amber-900 dark:text-amber-100 flex items-center gap-2">
              <Smile className="w-5 h-5 text-yellow-400" />
              {t.mood}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2">
              {[
                { emoji: '😢', label: t.sad },
                { emoji: '😔', label: t.bad },
                { emoji: '😐', label: t.normal },
                { emoji: '😊', label: t.good },
                { emoji: '🤩', label: t.super }
              ].map((mood, idx) => (
                <button
                  key={idx}
                  onClick={() => setDailyTracker({ ...dailyTracker, mood: mood.label })}
                  className={`p-3 rounded-lg flex flex-col items-center gap-1 transition-all ${
                    dailyTracker.mood === mood.label
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 ring-2 ring-yellow-400'
                      : 'bg-gray-50 dark:bg-stone-700 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                  }`}
                >
                  <span className="text-2xl">{mood.emoji}</span>
                  <span className="text-xs text-amber-700 dark:text-amber-300">{mood.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Tracker */}
        <Card className="border-none shadow-lg bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-amber-900 dark:text-amber-100 flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-400" />
              {t.activityMovement}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {[t.walk, t.yoga, t.sport, t.dance, t.stretching, t.other].map((activity, idx) => (
                <button
                  key={idx}
                  onClick={() => setDailyTracker({
                    ...dailyTracker,
                    activity
                  })}
                  className={`p-3 rounded-lg text-center text-sm transition-all ${
                    dailyTracker.activity === activity
                      ? 'bg-orange-100 dark:bg-orange-900/30 ring-2 ring-orange-400 text-orange-800 dark:text-orange-200 font-medium'
                      : 'bg-gray-50 dark:bg-stone-700 text-amber-700 dark:text-amber-300 hover:bg-orange-50 dark:hover:bg-orange-900/20'
                  }`}
                >
                  {activity}
                </button>
              ))}
            </div>
            <div>
              <Label className="text-amber-700 dark:text-amber-300">{t.durationMinutes}</Label>
              <Input
                type="number"
                placeholder="30"
                value={dailyTracker.activityMinutes || ''}
                onChange={(e) => setDailyTracker({
                  ...dailyTracker,
                  activityMinutes: parseInt(e.target.value) || undefined
                })}
                className="mt-2 bg-amber-50/50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
              />
            </div>
          </CardContent>
        </Card>

        {/* Skincare Tracker */}
        <Card className="border-none shadow-lg bg-gradient-to-br from-rose-100/80 to-pink-100/80 dark:from-rose-900/30 dark:to-pink-900/30 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Flower2 className="w-6 h-6 text-rose-500" />
                <div>
                  <p className="font-semibold text-rose-900 dark:text-rose-100">{t.skincareCompleted}</p>
                  <p className="text-sm text-rose-700 dark:text-rose-300">
                    {dailyTracker.skincareDone ? '✨ ' + t.routineTerminated : t.waiting}
                  </p>
                </div>
              </div>
              <Switch
                checked={dailyTracker.skincareDone}
                onCheckedChange={(checked) => {
                  setDailyTracker({ ...dailyTracker, skincareDone: checked })
                  if (checked) {
                    setRoutineItems(items =>
                      items.map(item =>
                        item.id === '2' ? { ...item, completed: true } : item
                      )
                    )
                  }
                }}
                className="data-[state=checked]:bg-rose-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Habits Checklist */}
        <Card className="border-none shadow-lg bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-amber-900 dark:text-amber-100">{t.dailyHabits}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              '🌅 ' + (lang === 'fr' ? 'Méditation matinale' : lang === 'es' ? 'Meditación matutina' : 'Morning meditation'),
              '💧 ' + (lang === 'fr' ? 'Boire de l\'eau' : lang === 'es' ? 'Beber agua' : 'Drink water'),
              '📖 ' + (lang === 'fr' ? 'Lire 10 minutes' : lang === 'es' ? 'Leer 10 minutos' : 'Read for 10 minutes'),
              '🧘 ' + (lang === 'fr' ? 'Mouvement doux' : lang === 'es' ? 'Movimiento suave' : 'Gentle movement'),
              '📓 ' + (lang === 'fr' ? 'Écrire dans mon journal' : lang === 'es' ? 'Escribir en mi diario' : 'Write in my journal'),
              '😴 ' + (lang === 'fr' ? 'Pas de screens avant dormir' : lang === 'es' ? 'Sin pantallas antes de dormir' : 'No screens before bed'),
              '🙏 ' + (lang === 'fr' ? 'Gratitude du soir' : lang === 'es' ? 'Gratitud nocturna' : 'Evening gratitude')
            ].map((habit, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-amber-50/50 dark:bg-amber-900/20 rounded-lg">
                <Checkbox id={`habit-${idx}`} className="border-amber-300 dark:border-amber-700" />
                <Label
                  htmlFor={`habit-${idx}`}
                  className="flex-1 text-amber-800 dark:text-amber-200 cursor-pointer"
                >
                  {habit}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="border-none shadow-md bg-white/60 dark:bg-stone-800/60 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              {t.tipText} {t.routineTip}
            </p>
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              {t.everydayAffirmation}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderRoutine = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 dark:from-stone-900 dark:via-rose-950 dark:to-stone-900 p-4 pb-32">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 pt-8">
          <h1 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
            {t.routineTitle}
          </h1>
          <p className="text-sm text-amber-700 dark:text-amber-300">
            {t.routineSubtitle} - {t.day} {currentDay} / 30
          </p>
        </div>

        {/* Progress */}
        <Card className="border-none shadow-lg bg-gradient-to-br from-amber-100/80 to-rose-100/80 dark:from-amber-900/30 dark:to-rose-900/30 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                {t.dailyProgress}
              </span>
              <span className="text-lg font-bold text-amber-900 dark:text-amber-100">
                {routineItems.filter(i => i.completed).length}/{routineItems.length}
              </span>
            </div>
            <Progress
              value={(routineItems.filter(i => i.completed).length / routineItems.length) * 100}
              className="h-2"
            />
          </CardContent>
        </Card>

        {/* Routine Items */}
        <div className="space-y-3">
          {routineItems.map((item, idx) => (
            <Card
              key={item.id}
              className={`border-none shadow-md transition-all cursor-pointer ${
                item.completed
                  ? 'bg-gradient-to-r from-amber-50 to-rose-50 dark:from-amber-900/30 dark:to-rose-900/30'
                  : 'bg-white/80 dark:bg-stone-800/80 hover:shadow-lg'
              }`}
              onClick={() => toggleRoutineItem(item.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                    item.completed
                      ? 'bg-gradient-to-br from-amber-400 to-rose-400'
                      : 'border-2 border-amber-300 dark:border-amber-700'
                  }`}>
                    {item.completed && (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${
                      item.completed
                        ? 'text-amber-700 dark:text-amber-300 line-through'
                        : 'text-amber-900 dark:text-amber-100'
                    }`}>
                      {item.title}
                    </p>
                    {item.description && (
                      <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-amber-600 dark:text-amber-300">
                      {idx + 1}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips */}
        <Card className="border-none shadow-md bg-white/60 dark:bg-stone-800/60 backdrop-blur-sm">
          <CardContent className="p-4 text-center space-y-2">
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              {t.tip2} {t.routineTip2}
            </p>
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              {t.everydayAffirmation}
            </p>
          </CardContent>
        </Card>

        {/* Affirmation */}
        <Card className="border-none shadow-lg bg-gradient-to-br from-rose-100/80 to-amber-100/80 dark:from-rose-900/30 dark:to-amber-900/30 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <Star className="w-6 h-6 text-amber-500 mx-auto mb-3" />
            <p className="text-lg font-medium italic text-amber-900 dark:text-amber-100">
              « {t.everydayAffirmation} »
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderVisionBoard = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 dark:from-stone-900 dark:via-rose-950 dark:to-stone-900 p-4 pb-32">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 pt-8">
          <h1 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
            {t.visionBoardTitle}
          </h1>
          <p className="text-sm text-amber-700 dark:text-amber-300">
            {t.visionBoardSubtitle}
          </p>
        </div>

        {/* Vision Board Grid */}
        <Card className="border-none shadow-lg bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
          <CardContent className="p-6">
            {visionImages.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-rose-100 dark:from-amber-900 dark:to-rose-900 flex items-center justify-center mx-auto">
                  <Star className="w-8 h-8 text-amber-500" />
                </div>
                <div>
                  <p className="text-amber-900 dark:text-amber-100 font-medium">{t.visionBoardEmpty}</p>
                  <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
                    {t.visionBoardEmptyDesc}
                  </p>
                </div>
                <Button className="bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white">
                  {t.addImage}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {visionImages.map((image, idx) => (
                  <div
                    key={image.id}
                    className="relative group aspect-square rounded-lg overflow-hidden bg-amber-100 dark:bg-amber-900/20"
                  >
                    <img
                      src={image.url}
                      alt={image.caption || `${t.visionBoard} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white text-sm text-center p-2">
                        {image.caption || ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Affirmations Section */}
        <Card className="border-none shadow-lg bg-gradient-to-br from-rose-100/80 to-amber-100/80 dark:from-rose-900/30 dark:to-amber-900/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-amber-900 dark:text-amber-100 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" />
              {t.myAffirmations}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-48">
              <div className="grid gap-3 pr-4">
                {bonusAffirmations.map((affirmation, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white/60 dark:bg-stone-700/50 rounded-lg border-l-4 border-amber-400"
                  >
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                      {idx + 1}. « {affirmation} »
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="border-none shadow-md bg-white/60 dark:bg-stone-800/60 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              {t.advice} {t.visionAdvice}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderBonus = () => {
    // Checklists and Guides data
    const checklists = [
      { id: 'skincare', title: 'Routine Skincare Simple', icon: '🧴' },
      { id: 'morning', title: 'Routine du Matin Soft Life', icon: '🌅' },
      { id: 'evening', title: 'Routine du Soir Glow', icon: '🌙' },
      { id: 'mealprep', title: 'Checklist Meal Prep', icon: '🥗' },
      { id: 'detox', title: 'Détox Digitale Guide', icon: '📱' }
    ]

    const guides = [
      {
        id: 'intro',
        title: 'Introduction au Soft Life',
        desc: 'Comprendre et adopter ce lifestyle',
        content: `
          <h3 class="text-lg font-bold mb-4">Qu'est-ce que le Soft Life ?</h3>
          <p class="mb-4">Le Soft Life est un mode de vie qui privilégie la douceur, la simplicité et l'intentionnalité. C'est choisir la qualité plutôt que la quantité, et privilégier son bien-être mental et physique.</p>
          
          <h3 class="text-lg font-bold mb-4">Les piliers du Soft Life</h3>
          <ul class="list-disc list-inside space-y-2 mb-4">
            <li><strong>Douceur</strong> - Traiter-toi avec gentillesse et compassion</li>
            <li><strong>Simplicité</strong> - Éliminer le superflu pour se concentrer sur l'essentiel</li>
            <li><strong>Lenteur</strong> - Prendre le temps, ne pas se précipiter</li>
            <li><strong>Intentionnalité</strong> - Choisir consciemment chaque action</li>
          </ul>
          
          <h3 class="text-lg font-bold mb-4">Comment commencer ?</h3>
          <p class="mb-4">Commence petit. Choisis une zone de ta vie à simplifier. Évite la pression de tout changer d'un coup. Le Soft Life est un journey, pas une destination.</p>
          
          <p class="italic text-amber-700 dark:text-amber-300">"La vraie richesse, c'est de profiter de ce qu'on a plutôt que d'attendre le bonheur demain."</p>
        `
      },
      {
        id: 'beauty',
        title: 'Beauté Minimaliste',
        desc: 'Less is more approach',
        content: `
          <h3 class="text-lg font-bold mb-4">La philosophie du less is more</h3>
          <p class="mb-4">La beauté minimaliste, c'est se concentrer sur l'essentiel. Quelques produits de qualité plutôt qu'une multitude de produits dont on n'a pas vraiment besoin.</p>
          
          <h3 class="text-lg font-bold mb-4">Les essentiels</h3>
          <ul class="list-disc list-inside space-y-2 mb-4">
            <li><strong>Nettoyant doux</strong> - Un bon nettoyant adapté à ton type de peau</li>
            <li><strong>Hydratation</strong> - Crème jour et crème nuit</li>
            <li><strong>Protection solaire</strong> - Indispensable tous les jours</li>
            <li><strong>Un sérum</strong> - Pour cibler des besoins spécifiques (optionnel)</li>
          </ul>
          
          <h3 class="text-lg font-bold mb-4">Routine matinale simple</h3>
          <ol class="list-decimal list-inside space-y-2 mb-4">
            <li>Nettoyer le visage</li>
            <li>Appliquer le sérum</li>
            <li>Hydrater</li>
            <li>Protéger du soleil</li>
          </ol>
          
          <h3 class="text-lg font-bold mb-4">Routine du soir simple</h3>
          <ol class="list-decimal list-inside space-y-2 mb-4">
            <li>Retirer le maquillage</li>
            <li>Nettoyer le visage</li>
            <li>Appliquer le soin de nuit</li>
            <li>Profiter d'un moment de calme</li>
          </ol>
        `
      },
      {
        id: 'organization',
        title: 'Organisation Douce',
        desc: 'Organiser sans stress',
        content: `
          <h3 class="text-lg font-bold mb-4">Pourquoi une organisation douce ?</h3>
          <p class="mb-4">L'organisation ne doit pas être source de stress. Elle doit simplifier ta vie, pas la compliquer. L'organisation douce, c'est créer des systèmes qui fonctionnent pour toi, naturellement.</p>
          
          <h3 class="text-lg font-bold mb-4">Les principes</h3>
          <ul class="list-disc list-inside space-y-2 mb-4">
            <li><strong>Tout à sa place</strong> - Chaque objet a un "chez lui"</li>
            <li><strong>Simplifier</strong> - Moins d'objets = moins d'encombrement mental</li>
            <li><strong>Des routines</strong> - Automatiser les tâches répétitives</li>
            <li><strong>La flexibilité</strong> - S'adapter quand ça ne marche pas</li>
          </ul>
          
          <h3 class="text-lg font-bold mb-4">Commencer petit</h3>
          <p class="mb-4">Choisis une seule zone (un tiroir, un bureau) et organise-la. Ne cherche pas la perfection. Une organisation imparfaite mais utilisable vaut mieux qu'une organisation parfaite mais impossible à maintenir.</p>
          
          <h3 class="text-lg font-bold mb-4">Rituel de fin de journée</h3>
          <p class="mb-4">Prends 5 minutes chaque soir pour remettre de l'ordre. Ça prépare mentalement à un nouveau jour et évite l'accumulation.</p>
        `
      },
      {
        id: 'mindset',
        title: 'Glow Up Mental',
        desc: 'Développer une mindset positive',
        content: `
          <h3 class="text-lg font-bold mb-4">La puissance du mindset</h3>
          <p class="mb-4">Ton mindset influence tout : tes actions, tes réactions, ton énergie. Travailler sur son mindset, c'est investir dans tous les aspects de sa vie.</p>
          
          <h3 class="text-lg font-bold mb-4">Pratiquer la gratitude</h3>
          <ul class="list-disc list-inside space-y-2 mb-4">
            <li>Chaque matin, note 3 choses pour lesquelles tu es reconnaissante</li>
            <li>Le soir, relis ta liste</li>
            <li>Partage ta gratitude avec les autres</li>
          </ul>
          
          <h3 class="text-lg font-bold mb-4">Reprogrammer les pensées négatives</h3>
          <p class="mb-4">Quand une pensée négative surgit, ne la laisse pas prendre le dessus.</p>
          <ol class="list-decimal list-inside space-y-2 mb-4">
            <li>Reconnaître la pensée</li>
            <li>La remettre en question</li>
            <li>La remplacer par une pensée positive</li>
          </ol>
          
          <h3 class="text-lg font-bold mb-4">Les affirmations</h3>
          <p class="mb-4">Répéter des affirmations positives reprogramme ton subconscient. Choisis des affirmations qui résonnent avec toi.</p>
          <ul class="list-disc list-inside space-y-2 mb-4">
            <li>Répète-les matin et soir</li>
            <li>Regarde-toi dans le miroir en les disant</li>
            <li>Écris-les dans ton journal</li>
          </ul>
          
          <h3 class="text-lg font-bold mb-4">S'entourer de positivité</h3>
          <p class="italic text-amber-700 dark:text-amber-300">"Tu es la moyenne des 5 personnes avec qui tu passes le plus de temps."</p>
        `
      }
    ]

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 dark:from-stone-900 dark:via-rose-950 dark:to-stone-900 p-4 pb-32">
        <div className="max-w-md mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-2 pt-8">
            <h1 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
              {t.bonusTitle}
            </h1>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              {t.bonusSubtitle}
            </p>
          </div>

          {/* Written Affirmations */}
          <Card className="border-none shadow-lg bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-amber-900 dark:text-amber-100 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500" />
                {t.writtenAffirmations}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48">
                <div className="grid gap-2 pr-4">
                  {bonusAffirmations.map((affirmation, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-amber-50/50 dark:bg-amber-900/20 rounded-lg border-l-3 border-amber-300 dark:border-amber-700"
                    >
                      <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                        {idx + 1}. « {affirmation} »
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Checklists */}
          <Card className="border-none shadow-lg bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-amber-900 dark:text-amber-100 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-rose-500" />
                {t.checklists}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {checklists.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setOpenChecklist(item.id)}
                  className="flex items-center justify-between p-3 bg-rose-50/50 dark:bg-rose-900/20 rounded-lg hover:bg-rose-100/50 dark:hover:bg-rose-900/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-medium text-rose-900 dark:text-rose-100">{item.title}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-rose-400" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Mini-guides */}
          <Card className="border-none shadow-lg bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-amber-900 dark:text-amber-100 flex items-center gap-2">
                <Heart className="w-5 h-5 text-orange-500" />
                {t.miniGuides}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {guides.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setOpenGuide(item.id)}
                  className="p-4 bg-orange-50/50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100/50 dark:hover:bg-orange-900/30 transition-colors cursor-pointer"
                >
                  <p className="font-medium text-orange-900 dark:text-orange-100">{item.title}</p>
                  <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">{item.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const renderSettings = () => {
    const startDate = challengeStartDate ? new Date(challengeStartDate).toLocaleDateString(lang === 'fr' ? 'fr-FR' : lang === 'es' ? 'es-ES' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }) : null

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 dark:from-stone-900 dark:via-rose-950 dark:to-stone-900 p-4 pb-32">
        <div className="max-w-md mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-2 pt-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-200 to-rose-200 dark:from-amber-600 dark:to-rose-600 flex items-center justify-center mx-auto">
              <User className="w-10 h-10 text-amber-700 dark:text-amber-100" />
            </div>
            <h1 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
              {t.profileSettings}
            </h1>
          </div>

          {/* Progress Overview */}
          <Card className="border-none shadow-lg bg-gradient-to-br from-amber-100/80 to-rose-100/80 dark:from-amber-900/30 dark:to-rose-900/30 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-amber-700 dark:text-amber-300">{t.globalProgress}</p>
                  <p className="text-3xl font-bold text-amber-900 dark:text-amber-100">
                    {completionPercentage}%
                  </p>
                </div>
                <Award className="w-12 h-12 text-amber-500" />
              </div>
              <Progress value={completionPercentage} className="h-3" />
              <div className="flex justify-between mt-3 text-sm">
                <span className="text-amber-700 dark:text-amber-300">
                  {completedDays.length} {t.daysGlowUp}
                </span>
                <span className="text-amber-700 dark:text-amber-300">
                  {30 - completedDays.length} {t.daysRemaining}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-none shadow-md bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                  {completedDays.length}
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300">{t.daysGlowUp}</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-rose-600 dark:text-rose-400">
                  {journalEntries.length}
                </p>
                <p className="text-xs text-rose-700 dark:text-rose-300">{t.journalEntries2}</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                  {Math.ceil(currentDay / 7)}
                </p>
                <p className="text-xs text-orange-700 dark:text-amber-300">{t.currentWeek}</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {routineItems.filter(i => i.completed).length}
                </p>
                <p className="text-xs text-green-700 dark:text-green-300">{t.dailyHabitsCompleted}</p>
              </CardContent>
            </Card>
          </div>

          {/* Start Date */}
          {startDate && (
            <Card className="border-none shadow-md bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-amber-700 dark:text-amber-300">{t.challengeStarted}</p>
                    <p className="text-lg font-semibold text-amber-900 dark:text-amber-100">
                      {startDate}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-amber-500" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Language Change */}
          <Card className="border-none shadow-lg bg-gradient-to-br from-amber-100/80 to-rose-100/80 dark:from-amber-900/30 dark:to-rose-900/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-amber-900 dark:text-amber-100 flex items-center gap-3 text-center">
                <Globe className="w-6 h-6 text-amber-500" />
                Langue / Language / Idioma
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-center text-sm text-amber-700 dark:text-amber-300 mb-4">
                Choisissez votre langue préferée. Le changement prendra effet immédiatement.
                <br />
                Select your preferred language. Changes will take effect immediately.
              </p>
              
              <div className="grid grid-cols-1 gap-4">
                {/* French */}
                <Button
                  onClick={() => setLang('fr')}
                  className={`w-full py-6 text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex flex-col items-center gap-3 ${
                    lang === 'fr'
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white'
                      : 'bg-gradient-to-r from-amber-100 to-rose-100 dark:from-amber-900 dark:to-rose-900 hover:from-amber-200 dark:hover:to-rose-800 text-amber-800 dark:text-amber-200 border-2 border-amber-400'
                  }`}
                >
                  <div className="text-4xl">🇫🇷</div>
                  <div className="text-center space-y-1">
                    <div className="text-2xl font-bold">Français</div>
                    <div className="text-sm">French</div>
                  </div>
                  {lang === 'fr' && <CheckCircle2 className="w-6 h-6 text-white" />}
                </Button>

                {/* English */}
                <Button
                  onClick={() => setLang('en')}
                  className={`w-full py-6 text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex flex-col items-center gap-3 ${
                    lang === 'en'
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white'
                      : 'bg-gradient-to-r from-amber-100 to-rose-100 dark:from-amber-900 dark:to-rose-900 hover:from-amber-200 dark:hover:to-rose-800 text-amber-800 dark:text-amber-200 border-2 border-amber-400'
                  }`}
                >
                  <div className="text-4xl">🇬🇧</div>
                  <div className="text-center space-y-1">
                    <div className="text-2xl font-bold">English</div>
                    <div className="text-sm">Anglais</div>
                  </div>
                  {lang === 'en' && <CheckCircle2 className="w-6 h-6 text-white" />}
                </Button>

                {/* Spanish */}
                <Button
                  onClick={() => setLang('es')}
                  className={`w-full py-6 text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex flex-col items-center gap-3 ${
                    lang === 'es'
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white'
                      : 'bg-gradient-to-r from-amber-100 to-rose-100 dark:from-amber-900 dark:to-rose-900 hover:from-amber-200 dark:hover:to-rose-800 text-amber-800 dark:text-amber-200 border-2 border-amber-400'
                  }`}
                >
                  <div className="text-4xl">🇪🇸</div>
                  <div className="text-center space-y-1">
                    <div className="text-2xl font-bold">Español</div>
                    <div className="text-sm">Spanish</div>
                  </div>
                  {lang === 'es' && <CheckCircle2 className="w-6 h-6 text-white" />}
                </Button>
              </div>

              <div className="text-center p-3 bg-amber-50/50 dark:bg-amber-900/20 rounded-lg">
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  ✓ Langue sauvegardée automatiquement
                  <br />
                  ✓ Language saved automatically
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="border-none shadow-lg bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-amber-900 dark:text-amber-100">{t.theme}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-amber-900 dark:text-amber-100">{t.theme}</p>
                  <p className="text-sm text-amber-600 dark:text-amber-400">
                    {theme === 'light' ? t.themeLight : t.themeDark}
                  </p>
                </div>
                <Button
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  size="sm"
                  className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-800"
                >
                  {theme === 'light' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
              </div>

              {/* Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-amber-900 dark:text-amber-100">{t.notifications}</p>
                  <p className="text-sm text-amber-600 dark:text-amber-400">
                    {t.notificationsDesc}
                  </p>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                  className="data-[state=checked]:bg-amber-500"
                />
              </div>
            </div>
            </CardContent>
          </Card>

          {/* Export Data */}
          <Card className="border-none shadow-lg bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-amber-900 dark:text-amber-100">{t.exportData}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 hover:bg-amber-50 dark:hover:bg-amber-900/20"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                {t.exportJournal}
              </Button>
              <Button
                variant="outline"
                className="w-full border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 hover:bg-amber-50 dark:hover:bg-amber-900/20"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                {t.exportProgress}
              </Button>
            </CardContent>
          </Card>

          {/* Reset */}
          <Card className="border-none shadow-md bg-rose-100/50 dark:bg-rose-900/20 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-rose-800 dark:text-rose-200 mb-2">
                {t.thanks}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-900/30"
                onClick={() => {
                  if (confirm(t.restartConfirm)) {
                    localStorage.removeItem('glowUpApp')
                    window.location.reload()
                  }
                }}
              >
                {t.restart}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const renderBottomNav = () => {
    if (currentTab === 'onboarding' || currentTab === 'language') return null

    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-t border-amber-200 dark:border-amber-800">
        <div className="max-w-md mx-auto flex justify-around py-2">
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`flex flex-col items-center gap-1 px-4 py-2 transition-all ${
              currentTab === 'dashboard'
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-amber-400 dark:text-amber-600 hover:text-amber-600 dark:hover:text-amber-400'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">{t.dashboard}</span>
          </button>

          <button
            onClick={() => setCurrentTab('challenge')}
            className={`flex flex-col items-center gap-1 px-4 py-2 transition-all ${
              currentTab === 'challenge'
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-amber-400 dark:text-amber-600 hover:text-amber-600 dark:hover:text-amber-400'
            }`}
          >
            <Calendar className="w-6 h-6" />
            <span className="text-xs font-medium">{t.challenge30Days}</span>
          </button>

          <button
            onClick={() => setCurrentTab('journal')}
            className={`flex flex-col items-center gap-1 px-4 py-2 transition-all ${
              currentTab === 'journal'
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-amber-400 dark:text-amber-600 hover:text-amber-600 dark:hover:text-amber-400'
            }`}
          >
            <PenLine className="w-6 h-6" />
            <span className="text-xs font-medium">{t.journalTitle}</span>
          </button>

          <button
            onClick={() => setCurrentTab('trackers')}
            className={`flex flex-col items-center gap-1 px-4 py-2 transition-all ${
              currentTab === 'trackers'
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-amber-400 dark:text-amber-600 hover:text-amber-600 dark:hover:text-amber-400'
            }`}
          >
            <TrendingUp className="w-6 h-6" />
            <span className="text-xs font-medium">{t.trackers}</span>
          </button>

          <button
            onClick={() => setCurrentTab('bonus')}
            className={`flex flex-col items-center gap-1 px-4 py-2 transition-all ${
              currentTab === 'bonus'
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-amber-400 dark:text-amber-600 hover:text-amber-600 dark:hover:text-amber-400'
            }`}
          >
            <Crown className="w-6 h-6" />
            <span className="text-xs font-medium">{t.bonus}</span>
          </button>

          <button
            onClick={() => setCurrentTab('settings')}
            className={`flex flex-col items-center gap-1 px-4 py-2 transition-all ${
              currentTab === 'settings'
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-amber-400 dark:text-amber-600 hover:text-amber-600 dark:hover:text-amber-400'
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">{t.profileSettings}</span>
          </button>
        </div>
      </nav>
    )
  }

  return (
    <>
      {currentTab === 'onboarding' && renderOnboarding()}
      {currentTab === 'language' && renderLanguageSelector()}
      {currentTab === 'dashboard' && renderDashboard()}
      {currentTab === 'challenge' && renderChallenge()}
      {currentTab === 'journal' && renderJournal()}
      {currentTab === 'trackers' && renderTrackers()}
      {currentTab === 'routine' && renderRoutine()}
      {currentTab === 'vision' && renderVisionBoard()}
      {currentTab === 'bonus' && renderBonus()}
      {currentTab === 'settings' && renderSettings()}

      {/* Celebration Popup */}
      <Dialog open={showCelebration} onOpenChange={setShowCelebration}>
        <DialogContent className="bg-gradient-to-br from-amber-50 to-rose-50 dark:from-amber-900/90 dark:to-rose-900/90 border-amber-200 dark:border-amber-800">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-amber-900 dark:text-amber-100 text-center">
              {t.celebrationTitle}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-200 to-rose-200 dark:from-amber-600 dark:to-rose-600 flex items-center justify-center">
                <Award className="w-10 h-10 text-amber-700 dark:text-amber-100" />
              </div>
            </div>

            <div className="text-center space-y-3">
              <p className="text-lg font-medium text-amber-900 dark:text-amber-100">
                {t.youCompleted} {celebrationDay} ! {t.congratations}
              </p>
              <p className="text-amber-700 dark:text-amber-300">
                {celebrationDay === 30
                  ? t.youCompleted2
                  : t.bigStep}
                }
              </p>
            </div>

            {celebrationDay < 30 && (
              <div className="p-4 bg-white/60 dark:bg-stone-800/60 rounded-lg text-center">
                <p className="text-amber-800 dark:text-amber-200 font-medium">
                  {t.seeTomorrow} {celebrationDay + 1} !
                </p>
                <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
                  {t.tomorrowUnlock}
                </p>
              </div>
            )}

            {celebrationDay === 30 && (
              <div className="p-4 bg-gradient-to-br from-amber-100 to-rose-100 dark:from-amber-900/50 dark:to-rose-900/50 rounded-lg text-center">
                <p className="text-amber-900 dark:text-amber-100 font-medium">
                  {t.youFinished}
                </p>
              </div>
            )}

            <Button
              onClick={() => setShowCelebration(false)}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-semibold rounded-xl"
            >
              {celebrationDay === 30 ? t.dashboard : 'Continuer'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Checklist Modals */}
      <Dialog open={!!openChecklist} onOpenChange={(open) => !open && setOpenChecklist(null)}>
        <DialogContent className="bg-gradient-to-br from-rose-50 to-amber-50 dark:from-rose-900/90 dark:to-amber-900/90 border-rose-200 dark:border-rose-800 max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-rose-900 dark:text-rose-100">
              {checklists.find(c => c.id === openChecklist)?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-6 prose prose-sm max-w-none" dangerouslySetInnerHTML={{
            __html: openChecklist === 'skincare' ? `
              <h3 class="text-lg font-bold mb-4 text-rose-900 dark:text-rose-100">Routine Skincare Simple</h3>
              <p class="mb-4 text-rose-700 dark:text-rose-300">Une skincare simple et efficace est la clé d'une peau éclatante. Voici les essentiels :</p>
              
              <h3 class="text-lg font-bold mb-4 text-rose-900 dark:text-rose-100">Matin</h3>
              <ol class="list-decimal list-inside space-y-2 mb-4">
                <li><strong>Nettoyant doux</strong> - Nettoyer le visage avec un produit adapté</li>
                <li><strong>Tonique</strong> - Équilibrer le pH de la peau</li>
                <li><strong>Sérum (optionnel)</strong> - Pour cibler des besoins spécifiques</li>
                <li><strong>Crème hydratante</strong> - Protéger et nourrir la peau</li>
                <li><strong>Protection solaire</strong> - Indispensable même en hiver</li>
              </ol>
              
              <h3 class="text-lg font-bold mb-4 text-rose-900 dark:text-rose-100">Soir</h3>
              <ol class="list-decimal list-inside space-y-2 mb-4">
                <li><strong>Démaquillage</strong> - Retirer maquillage et impuretés</li>
                <li><strong>Nettoyant</strong> - Nettoyer en profondeur</li>
                <li><strong>Soin de nuit</strong> - Crème plus riche pour la nuit</li>
                <li><strong>Contour des yeux</strong> - Hydrater cette zone délicate</li>
              </ol>
              
              <h3 class="text-lg font-bold mb-4 text-rose-900 dark:text-rose-100">Conseils</h3>
              <ul class="list-disc list-inside space-y-2">
                <li>Utiliser des produits adaptés à ton type de peau</li>
                <li>Ne pas oublier le cou et le décolleté</li>
                <li>Patoter plutôt que frotter pour ne pas irriter</li>
                <li>Être patiente : les résultats prennent du temps</li>
              </ul>
            ` : openChecklist === 'morning' ? `
              <h3 class="text-lg font-bold mb-4 text-rose-900 dark:text-rose-100">Routine du Matin Soft Life</h3>
              <p class="mb-4 text-rose-700 dark:text-rose-300">Commencer la journée doucement prépare mentalement et physiquement à une belle journée.</p>
              
              <h3 class="text-lg font-bold mb-4 text-rose-900 dark:text-rose-100">1. Réveil en douceur</h3>
              <ul class="list-disc list-inside space-y-2 mb-4">
                <li>Se réveiller sans alarme brutale si possible</li>
                <li>Prendre 5 minutes au lit pour s'étirer</li>
                <li>Respirer profondément 3 fois</li>
              </ul>
              
              <h3 class="text-lg font-bold mb-4 text-rose-900 dark:text-rose-100">2. Hydratation</h3>
              <ul class="list-disc list-inside space-y-2 mb-4">
                <li>Boire un grand verre d'eau au réveil</li>
                <li>Boire un citron pressé dans l'eau tiède (optionnel)</li>
                <li>Se laver le visage à l'eau fraîche</li>
              </ul>
              
              <h3 class="text-lg font-bold mb-4 text-rose-900 dark:text-rose-100">3. Skincare minimal</h3>
              <ul class="list-disc list-inside space-y-2 mb-4">
                <li>Nettoyer le visage en douceur</li>
                <li>Hydrater avec une crème légère</li>
                <li>Appliquer un SPF si tu sors</li>
              </ul>
              
              <h3 class="text-lg font-bold mb-4 text-rose-900 dark:text-rose-100">4. Intention du jour</h3>
              <p class="mb-4 text-rose-700 dark:text-rose-300">Prendre un moment pour définir son intention pour la journée.</p>
              <ul class="list-disc list-inside space-y-2">
                <li>Écrire 3 objectifs pour la journée</li>
                <li>Choisir comment on veut se sentir</li>
                <li>Visualiser une journée réussie</li>
              </ul>
            ` : openChecklist === 'evening' ? `
              <h3 class="text-lg font-bold mb-4 text-rose-900 dark:text-rose-100">Routine du Soir Glow</h3>
              <p class="mb-4 text-rose-700 dark:text-rose-300">Une routine du soir calme aide à bien dormir et prépare pour un bon réveil.</p>
              
              <h3 class="text-lg font-bold mb-4 text-rose-900 dark:text-rose-100">1. Déconnexion digitale</h3>
              <ul class="list-disc list-inside space-y-2 mb-4">
                <li>Arrêter les écrans 1h avant de dormir</li>
                <li>Passer en mode nuit sur le téléphone</li>
                <li>Ne pas emporter le téléphone au lit</li>
              </ul>
              
              <h3 class="text-lg font-bold mb-4 text-rose-900 dark:text-rose-100">2. Soin du soir</h3>
              <ul class="list-disc list-inside space-y-2 mb-4">
                <li>Démaquiller en profondeur</li>
                <li>Nettoyer le visage</li>
                <li>Appliquer le soin de nuit</li>
                <li>Masser doucement le visage</li>
              </ul>
              
              <h3 class="text-lg font-bold mb-4 text-rose-900 dark:text-rose-100">3. Préparation de demain</h3>
              <ul class="list-disc list-inside space-y-2 mb-4">
                <li>Préparer ses vêtements pour le lendemain</li>
                <li>Préparer son sac si besoin</li>
                <li>Écrire 3 priorités pour demain</li>
              </ul>
              
              <h3 class="text-lg font-bold mb-4 text-rose-900 dark:text-rose-100">4. Rituel de calme</h3>
              <ul class="list-disc list-inside space-y-2 mb-4">
                <li>Boire une tisane relaxante</li>
                <li>Lire quelques pages d'un livre</li>
                <li>Pratiquer 5 minutes de respiration</li>
                <li>Écrire 3 choses de gratitude</li>
              </ul>
            ` : openChecklist === 'mealprep' ? `
              <h3 class="text-lg font-bold mb-4 text-rose-900 dark:text-rose-100">Checklist Meal Prep</h3>
              <p class="mb-4 text-rose-700 dark:text-rose-300">Le meal prep simplifie la vie et assure une alimentation saine.</p>
              
              <h3 class="text-lg font-bold mb-4 text-rose-900 dark:text-rose-100">1. Planification</h3>
              <ul class="list-disc list-inside space-y-2 mb-4">
                <li>Choisir 2-3 recettes pour la semaine</li>
                <li>Noter les ingrédients nécessaires</li>
                <li>Faire la liste de courses</li>
              </ul>
              
              <h3 class="text-lg font-bold mb-4 text-rose-900 dark:text-rose-100">2. Courses</h3>
              <ul class="list-disc list-inside space-y-2 mb-4">
                <li>Faire les courses de la semaine</li>
                <li>Privilégier les aliments frais et de saison</li>
                <li>Prévoir des encas sains</li>
              </ul>
              
              <h3 class="text-lg font-bold mb-4 text-rose-900 dark:text-rose-100">3. Préparation</h3>
              <ul class="list-disc list-inside space-y-2 mb-4">
                <li>Cuisiner en lot (batch cooking)</li>
                <li>Préparer les portions en avance</li>
                <li>Utiliser des contenants adaptés</li>
                <li>Étiqueter avec les dates</li>
              </ul>
              
              <h3 class="text-lg font-bold mb-4 text-rose-900 dark:text-rose-100">4. Stockage</h3>
              <ul class="list-disc list-inside space-y-2 mb-4">
                <li>Ranger le réfrigérateur de manière organisée</li>
                <li>Placer les produits à consommer en premier</li>
                <li>Congeler ce qui ne sera pas consommé dans 3 jours</li>
              </ul>
            ` : `
              <h3 class="text-lg font-bold mb-4 text-rose-900 dark:text-rose-100">Détox Digitale Guide</h3>
              <p class="mb-4 text-rose-700 dark:text-rose-300">Une détox digitale permet de reprendre le contrôle sur son temps et son attention.</p>
              
              <h3 class="text-lg font-bold mb-4 text-rose-900 dark:text-rose-100">1. Faire le tri</h3>
              <ul class="list-disc list-inside space-y-2 mb-4">
                <li>Supprimer les applications inutiles</li>
                <li>Désabonner des newsletters non lues</li>
                <li>Nettoyer les photos et vidéos</li>
                <li>Organiser les fichiers</li>
              </ul>
              
              <h3 class="text-lg font-bold mb-4 text-rose-900 dark:text-rose-100">2. Limiter le temps d'écran</h3>
              <ul class="list-disc list-inside space-y-2 mb-4">
                <li>Définir des limites de temps d'utilisation</li>
                <li>Utiliser des outils de suivi</li>
                <li>Créer des zones sans écran</li>
              </ul>
              
              <h3 class="text-lg font-bold mb-4 text-rose-900 dark:text-rose-100">3. Notifications</h3>
              <ul class="list-disc list-inside space-y-2 mb-4">
                <li>Désactiver les notifications non essentielles</li>
                <li>Regrouper les notifications par app</li>
                <li>Utiliser le mode ne pas déranger</li>
              </ul>
              
              <h3 class="text-lg font-bold mb-4 text-rose-900 dark:text-rose-100">4. Habitudes saines</h3>
              <ul class="list-disc list-inside space-y-2 mb-4">
                <li>Pas de téléphone au lit</li>
                <li>Pas d'écran pendant les repas</li>
                <li>Prendre des pauses régulières</li>
                <li>Pratiquer des activités hors ligne</li>
              </ul>
            `
          }} />
          <Button
            onClick={() => setOpenChecklist(null)}
            className="w-full py-3 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-semibold rounded-xl"
          >
            {t.close}
          </Button>
        </DialogContent>
      </Dialog>

      {/* Guide Modals */}
      <Dialog open={!!openGuide} onOpenChange={(open) => !open && setOpenGuide(null)}>
        <DialogContent className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/90 dark:to-amber-900/90 border-orange-200 dark:border-orange-800 max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-orange-900 dark:text-orange-100">
              {guides.find(g => g.id === openGuide)?.title}
            </DialogTitle>
          </DialogHeader>
          <div 
            className="space-y-6 py-6 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: guides.find(g => g.id === openGuide)?.content || '' }}
          />
          <Button
            onClick={() => setOpenGuide(null)}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl"
          >
            {t.close}
          </Button>
        </DialogContent>
      </Dialog>

      {renderBottomNav()}
    </>
  )
}
