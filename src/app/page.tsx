'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { challengeDays, getCompletionPercentage } from '@/lib/data/challengeDays'
import { Sparkles, BookOpen, Calendar, Heart, Sun, Moon, Target, Award, ChevronRight, CheckCircle2, Star, Smile, Droplets, Clock, Flame, Flower2, Crown, Home, Book, PenLine, TrendingUp, User, Settings, Lock } from 'lucide-react'

type TabValue = 'onboarding' | 'dashboard' | 'challenge' | 'journal' | 'trackers' | 'routine' | 'vision' | 'bonus' | 'settings'

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

interface DailyData {
  date: string
  tracker: DailyTrackerData
  routine: RoutineItem[]
  journalEntry?: JournalEntry
}

const inspirationalQuote = "Le glow commence par l'intérieur. Rayonne de qui tu es vraiment."

const bonusAffirmations = [
  "Je mérite d'être heureuse",
  "Je suis capable de tout",
  "Je rayonne de lumière",
  "Je suis digne d'amour",
  "Je suis en train de devenir la meilleure version de moi-même",
  "Je suis assez",
  "Je suis puissante",
  "Je suis belle",
  "Je suis confiante",
  "Je suis en paix"
]

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
  const [hasStarted, setHasStarted] = useState(false)
  const [challengeStartDate, setChallengeStartDate] = useState<string | null>(null)
  const [currentDay, setCurrentDay] = useState(1)
  const [completedDays, setCompletedDays] = useState<number[]>([])
  const [dayNotes, setDayNotes] = useState<Record<number, string>>({})
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationDay, setCelebrationDay] = useState(1)
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

  const completionPercentage = getCompletionPercentage(completedDays)

  // Calcul du jour actuel basé sur la date
  useEffect(() => {
    if (challengeStartDate) {
      const calculatedDay = calculateCurrentDay(challengeStartDate)
      setCurrentDay(calculatedDay)
    }
  }, [challengeStartDate])

  // Charger les données depuis localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('glowUpApp')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
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

  // Sauvegarder les données dans localStorage
  useEffect(() => {
    const todayKey = getTodayKey()
    const data = {
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
  }, [hasStarted, challengeStartDate, completedDays, dayNotes, journalEntries, visionImages, theme, notifications, dailyTracker, routineItems])

  const handleStartChallenge = () => {
    const startDate = new Date().toISOString()
    setChallengeStartDate(startDate)
    setHasStarted(true)
    setCurrentDay(1)
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
            Glow Up Challenge
          </CardTitle>
          <CardDescription className="text-lg mt-2 text-amber-800 dark:text-amber-200">
            30 jours pour rayonner de l'intérieur
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="text-center space-y-4">
            <p className="text-lg font-medium italic text-amber-900 dark:text-amber-100 leading-relaxed">
              « {inspirationalQuote} »
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 text-center">
              Ce que tu vas découvrir :
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-amber-50 to-rose-50 dark:from-stone-700 dark:to-rose-900/30 rounded-lg">
                <Flower2 className="w-8 h-8 text-rose-500 mb-2 mx-auto" />
                <p className="text-sm text-center text-amber-800 dark:text-amber-200">Beauté et Self-care</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-amber-50 to-rose-50 dark:from-stone-700 dark:to-rose-900/30 rounded-lg">
                <Crown className="w-8 h-8 text-amber-500 mb-2 mx-auto" />
                <p className="text-sm text-center text-amber-800 dark:text-amber-200">Mindset et Confiance</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-amber-50 to-rose-50 dark:from-stone-700 dark:to-rose-900/30 rounded-lg">
                <Heart className="w-8 h-8 text-rose-500 mb-2 mx-auto" />
                <p className="text-sm text-center text-amber-800 dark:text-amber-200">Équilibre et Harmonie</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-amber-50 to-rose-50 dark:from-stone-700 dark:to-rose-900/30 rounded-lg">
                <Star className="w-8 h-8 text-amber-500 mb-2 mx-auto" />
                <p className="text-sm text-center text-amber-800 dark:text-amber-200">Lifestyle Glow</p>
              </div>
            </div>
          </div>

          <div className="text-center space-y-3">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              • 4 semaines thématiques
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              • Actions quotidiennes Beauté, Mental et Lifestyle
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              • Journaling et Trackers personnalisés
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              • Affirmations et Vision Board
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              • Nouveau jour débloqué chaque jour à minuit
            </p>
          </div>

          <Button
            onClick={handleStartChallenge}
            className="w-full py-6 text-lg bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Commencer mon Glow Up
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderDashboard = () => {
    const today = new Date().toLocaleDateString('fr-FR', {
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
                {today.charAt(0).toUpperCase() + today.slice(1)}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
              Mon Glow Up
            </h1>
            <p className="text-sm text-amber-600 dark:text-amber-400">
              Jour {currentDay} / 30
            </p>
          </div>

          {/* Progress Card */}
          <Card className="border-none shadow-lg bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-amber-900 dark:text-amber-100">Progression du mois</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-amber-700 dark:text-amber-300">Complétion</span>
                  <span className="font-semibold text-amber-900 dark:text-amber-100">{completionPercentage}%</span>
                </div>
                <Progress value={completionPercentage} className="h-3" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-rose-500" />
                  <span className="text-amber-700 dark:text-amber-300">
                    {completedDays.length} jour{completedDays.length > 1 ? 's' : ''} complété{completedDays.length > 1 ? 's' : ''}
                  </span>
                </div>
                <Badge variant="secondary" className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
                  {30 - completedDays.length} restant{30 - completedDays.length > 1 ? 's' : ''}
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
                <p className="font-semibold text-sm text-amber-900 dark:text-amber-100">Challenge du jour</p>
                <Badge className="bg-white/90 dark:bg-stone-700/90 text-amber-700 dark:text-amber-300 text-xs">
                  Jour {currentDay}
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
                <p className="font-semibold text-sm text-rose-900 dark:text-rose-100">Mon Journal</p>
                <Badge className="bg-white/90 dark:bg-stone-700/90 text-rose-700 dark:text-rose-300 text-xs">
                  {journalEntries.length} entrées
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
                <p className="font-semibold text-sm text-orange-900 dark:text-orange-100">Trackers</p>
                <Badge className="bg-white/90 dark:bg-stone-700/90 text-orange-700 dark:text-orange-300 text-xs">
                  Hydratation: {dailyTracker.hydration}/8
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
                <p className="font-semibold text-sm text-amber-900 dark:text-amber-100">Ma Routine</p>
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
                <p className="font-semibold text-sm text-rose-900 dark:text-rose-100">Vision Board</p>
                <Badge className="bg-white/90 dark:bg-stone-700/90 text-rose-700 dark:text-rose-300 text-xs">
                  {visionImages.length} images
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
                <p className="font-semibold text-sm text-amber-900 dark:text-amber-100">Bonus</p>
                <Badge className="bg-white/90 dark:bg-stone-700/90 text-amber-700 dark:text-amber-300 text-xs">
                  Ressources
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
                Affirmation du jour
              </Badge>
            </CardContent>
          </Card>

          {/* Motivation */}
          <Card className="border-none shadow-md bg-white/60 dark:bg-stone-800/60 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-amber-700 dark:text-amber-300">
                💖 Tu es sur la bonne voie ! Continue comme ça, chaque jour compte.
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
              Challenge 30 Jours
            </h1>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Semaine {Math.ceil(currentDay / 7)} - {['Reset et Nettoyage', 'Beauté et Self-care', 'Mindset et Confiance', 'Lifestyle et Énergie'][Math.ceil(currentDay / 7) - 1]}
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
                    title={isLocked ? 'Disponible à minuit' : ''}
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
                  Ce jour sera disponible demain à minuit
                </p>
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                  Reviens demain pour continuer ton Glow Up !
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
                    Jour {day.id}
                  </Badge>
                  {completedDays.includes(day.id) && (
                    <Badge className="bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Complété
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
                      <p className="text-sm font-medium text-amber-700 dark:text-amber-300 mb-1">Affirmation du jour</p>
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
                    <h4 className="font-semibold text-rose-900 dark:text-rose-100">Questions de réflexion</h4>
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
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100">Actions du jour</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center flex-shrink-0">
                        <Flower2 className="w-4 h-4 text-amber-600 dark:text-amber-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-amber-900 dark:text-amber-100">Beauté</p>
                        <p className="text-sm text-amber-700 dark:text-amber-300">{day.beauty}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-800 flex items-center justify-center flex-shrink-0">
                        <Crown className="w-4 h-4 text-rose-600 dark:text-rose-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-rose-900 dark:text-rose-100">Mental</p>
                        <p className="text-sm text-rose-700 dark:text-rose-300">{day.mental}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-800 flex items-center justify-center flex-shrink-0">
                        <Sun className="w-4 h-4 text-orange-600 dark:text-orange-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-orange-900 dark:text-orange-100">Lifestyle</p>
                        <p className="text-sm text-orange-700 dark:text-orange-300">{day.lifestyle}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label className="text-amber-900 dark:text-amber-100">Notes du jour</Label>
                  <Textarea
                    placeholder="Écris tes pensées, ressentis ou notes pour ce jour..."
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
                    J'ai complété ce jour
                  </Button>
                )}

                {completedDays.includes(currentDay) && (
                  <div className="text-center p-4 bg-rose-100 dark:bg-rose-900/30 rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-rose-700 dark:text-rose-300">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="font-semibold">Jour complété ! Félicitations 💖</span>
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
            Mon Journal
          </h1>
          <p className="text-sm text-amber-700 dark:text-amber-300">
            Espace d'écriture et de réflexion - Jour {currentDay}
          </p>
        </div>

        {/* New Entry Card */}
        <Card className="border-none shadow-lg bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-amber-900 dark:text-amber-100">Nouvelle entrée</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Guided Questions */}
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <Label className="text-sm text-amber-700 dark:text-amber-300">
                  Comment je me sens aujourd'hui ?
                </Label>
                <Input
                  placeholder="✨ ..."
                  value={guidedAnswers.feeling}
                  onChange={(e) => setGuidedAnswers({ ...guidedAnswers, feeling: e.target.value })}
                  className="mt-2 bg-white/50 dark:bg-stone-700/50 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100"
                />
              </div>

              <div className="p-3 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                <Label className="text-sm text-rose-700 dark:text-rose-300">
                  Qu'est-ce qui m'a apporté du glow ?
                </Label>
                <Input
                  placeholder="💖 ..."
                  value={guidedAnswers.glowMoment}
                  onChange={(e) => setGuidedAnswers({ ...guidedAnswers, glowMoment: e.target.value })}
                  className="mt-2 bg-white/50 dark:bg-stone-700/50 border-rose-200 dark:border-rose-800 text-amber-900 dark:text-amber-100"
                />
              </div>

              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <Label className="text-sm text-orange-700 dark:text-orange-300">
                  Qu'est-ce que j'ai appris ?
                </Label>
                <Input
                  placeholder="🌱 ..."
                  value={guidedAnswers.learning}
                  onChange={(e) => setGuidedAnswers({ ...guidedAnswers, learning: e.target.value })}
                  className="mt-2 bg-white/50 dark:bg-stone-700/50 border-orange-200 dark:border-orange-800 text-amber-900 dark:text-amber-100"
                />
              </div>
            </div>

            {/* Free Journal */}
            <div className="space-y-2">
              <Label className="text-amber-900 dark:text-amber-100">Journal libre</Label>
              <Textarea
                placeholder="Écris tout ce qui te passe par l'esprit..."
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
              Sauvegarder
            </Button>
          </CardContent>
        </Card>

        {/* History */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-amber-900 dark:text-amber-100">Historique</h2>
          {journalEntries.length === 0 ? (
            <Card className="border-none shadow-md bg-white/60 dark:bg-stone-800/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-12 h-12 text-amber-300 dark:text-amber-700 mx-auto mb-3" />
                <p className="text-amber-700 dark:text-amber-300">Aucune entrée pour le moment</p>
                <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
                  Commence ton journal ci-dessus ✨
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
                        {new Date(entry.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </Badge>
                    </div>
                    {entry.feeling && (
                      <div className="text-sm text-amber-700 dark:text-amber-300">
                        <span className="font-medium">Humeur :</span> {entry.feeling}
                      </div>
                    )}
                    {entry.glowMoment && (
                      <div className="text-sm text-rose-700 dark:text-rose-300">
                        <span className="font-medium">Glow moment :</span> {entry.glowMoment}
                      </div>
                    )}
                    {entry.learning && (
                      <div className="text-sm text-orange-700 dark:text-orange-300">
                        <span className="font-medium">Apprentissage :</span> {entry.learning}
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
            Trackers Glow Up
          </h1>
          <p className="text-sm text-amber-700 dark:text-amber-300">
            Suivi de tes habitudes - Jour {currentDay}
          </p>
        </div>

        {/* Hydration Tracker */}
        <Card className="border-none shadow-lg bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-amber-900 dark:text-amber-100 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-400" />
                Hydratation
              </CardTitle>
              <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                {dailyTracker.hydration}/{dailyTracker.hydrationGoal} verres
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
              Sommeil
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-amber-700 dark:text-amber-300">Heures de sommeil</Label>
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
              <Label className="text-amber-700 dark:text-amber-300">Qualité du sommeil</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {['😴', '😐', '😊', '😄'].map((emoji, idx) => (
                  <button
                    key={idx}
                    onClick={() => setDailyTracker({
                      ...dailyTracker,
                      sleepQuality: ['Mauvais', 'Moyen', 'Bon', 'Excellent'][idx]
                    })}
                    className={`p-3 rounded-lg text-2xl transition-all ${
                      dailyTracker.sleepQuality === ['Mauvais', 'Moyen', 'Bon', 'Excellent'][idx]
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
              Humeur
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2">
              {[
                { emoji: '😢', label: 'Triste' },
                { emoji: '😔', label: 'Mal' },
                { emoji: '😐', label: 'Normal' },
                { emoji: '😊', label: 'Bien' },
                { emoji: '🤩', label: 'Super' }
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
              Activité / Mouvement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {['Marche', 'Yoga', 'Sport', 'Danse', 'Étirement', 'Autre'].map((activity, idx) => (
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
              <Label className="text-amber-700 dark:text-amber-300">Durée (minutes)</Label>
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
                  <p className="font-semibold text-rose-900 dark:text-rose-100">Skincare complété</p>
                  <p className="text-sm text-rose-700 dark:text-rose-300">
                    {dailyTracker.skincareDone ? '✨ Routine terminée' : 'En attente'}
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
            <CardTitle className="text-lg text-amber-900 dark:text-amber-100">Habitudes quotidiennes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              '🌅 Méditation matinale',
              '💧 Boire de l\'eau',
              '📖 Lire 10 minutes',
              '🧘 Mouvement doux',
              '📓 Écrire dans mon journal',
              '😴 Pas de screens avant dormir',
              '🙏 Gratitude du soir'
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
      </div>
    </div>
  )

  const renderRoutine = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 dark:from-stone-900 dark:via-rose-950 dark:to-stone-900 p-4 pb-32">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 pt-8">
          <h1 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
            Routine Glow Up
          </h1>
          <p className="text-sm text-amber-700 dark:text-amber-300">
            Ta routine quotidienne personnalisée - Jour {currentDay}
          </p>
        </div>

        {/* Progress */}
        <Card className="border-none shadow-lg bg-gradient-to-br from-amber-100/80 to-rose-100/80 dark:from-amber-900/30 dark:to-rose-900/30 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                Progression du jour
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
              💡 <strong>Astuce :</strong> Consistance > Perfection. Fais de ton mieux chaque jour !
            </p>
          </CardContent>
        </Card>

        {/* Affirmation */}
        <Card className="border-none shadow-lg bg-gradient-to-br from-rose-100/80 to-amber-100/80 dark:from-rose-900/30 dark:to-amber-900/30 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <Star className="w-6 h-6 text-amber-500 mx-auto mb-3" />
            <p className="text-lg font-medium italic text-amber-900 dark:text-amber-100">
              « Chaque petite action compte. Tu es en train de créer ta meilleure version. »
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
            Vision Board
          </h1>
          <p className="text-sm text-amber-700 dark:text-amber-300">
            Crée ta vision de toi-même
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
                  <p className="text-amber-900 dark:text-amber-100 font-medium">Vision Board vide</p>
                  <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
                    Ajoute des images qui inspirent ton glow up
                  </p>
                </div>
                <Button className="bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white">
                  Ajouter une image
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
                      alt={image.caption || `Vision ${idx + 1}`}
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
              Mes affirmations
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
                    <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                      « {affirmation} »
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
              💖 <strong>Conseil :</strong> Regarde ton vision board chaque matin pour rester connectée à tes objectifs.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderBonus = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 dark:from-stone-900 dark:via-rose-950 dark:to-stone-900 p-4 pb-32">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 pt-8">
          <h1 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
            Bonus Glow Up
          </h1>
          <p className="text-sm text-amber-700 dark:text-amber-300">
            Ressources pour t'accompagner
          </p>
        </div>

        {/* Audio Affirmations */}
        <Card className="border-none shadow-lg bg-gradient-to-br from-amber-100/80 to-rose-100/80 dark:from-amber-900/30 dark:to-rose-900/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-amber-900 dark:text-amber-100 flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-500" />
              Affirmations Audio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {bonusAffirmations.slice(0, 5).map((affirmation, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 bg-white/60 dark:bg-stone-700/50 rounded-lg"
              >
                <Button
                  size="sm"
                  className="bg-amber-500 hover:bg-amber-600 text-white rounded-full h-10 w-10 flex-shrink-0"
                >
                  ▶️
                </Button>
                <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                  {affirmation}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Written Affirmations */}
        <Card className="border-none shadow-lg bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-amber-900 dark:text-amber-100 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" />
              Affirmations Écrites
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

        {/* PDF Checklists */}
        <Card className="border-none shadow-lg bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-amber-900 dark:text-amber-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-rose-500" />
              Checklists PDF
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: 'Routine Skincare Simple', icon: '🧴' },
              { title: 'Routine du Matin Soft Life', icon: '🌅' },
              { title: 'Routine du Soir Glow', icon: '🌙' },
              { title: 'Checklist Meal Prep', icon: '🥗' },
              { title: 'Détox Digitale Guide', icon: '📱' }
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-rose-50/50 dark:bg-rose-900/20 rounded-lg hover:bg-rose-100/50 dark:hover:bg-rose-900/30 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-medium text-rose-900 dark:text-rose-100">{item.title}</span>
                </div>
                <Badge className="bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200 text-xs">
                  PDF
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Mini-guides */}
        <Card className="border-none shadow-lg bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-amber-900 dark:text-amber-100 flex items-center gap-2">
              <Heart className="w-5 h-5 text-orange-500" />
              Mini-guides Soft Life
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: 'Introduction au Soft Life', desc: 'Comprendre et adopter ce lifestyle' },
              { title: 'Beauté Minimaliste', desc: 'Less is more approach' },
              { title: 'Organisation Douce', desc: 'Organiser sans stress' },
              { title: 'Glow Up Mental', desc: 'Développer une mindset positive' }
            ].map((item, idx) => (
              <div
                key={idx}
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

  const renderSettings = () => {
    const startDate = challengeStartDate ? new Date(challengeStartDate).toLocaleDateString('fr-FR', {
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
              Profil et Paramètres
            </h1>
          </div>

          {/* Progress Overview */}
          <Card className="border-none shadow-lg bg-gradient-to-br from-amber-100/80 to-rose-100/80 dark:from-amber-900/30 dark:to-rose-900/30 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-amber-700 dark:text-amber-300">Progression globale</p>
                  <p className="text-3xl font-bold text-amber-900 dark:text-amber-100">
                    {completionPercentage}%
                  </p>
                </div>
                <Award className="w-12 h-12 text-amber-500" />
              </div>
              <Progress value={completionPercentage} className="h-3" />
              <div className="flex justify-between mt-3 text-sm">
                <span className="text-amber-700 dark:text-amber-300">
                  {completedDays.length} jours complétés
                </span>
                <span className="text-amber-700 dark:text-amber-300">
                  {30 - completedDays.length} restants
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
                <p className="text-xs text-amber-700 dark:text-amber-300">Jours Glow Up</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-rose-600 dark:text-rose-400">
                  {journalEntries.length}
                </p>
                <p className="text-xs text-rose-700 dark:text-rose-300">Entrées journal</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                  {Math.ceil(currentDay / 7)}
                </p>
                <p className="text-xs text-orange-700 dark:text-orange-300">Semaine actuelle</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {routineItems.filter(i => i.completed).length}
                </p>
                <p className="text-xs text-green-700 dark:text-green-300">Habitudes jour</p>
              </CardContent>
            </Card>
          </div>

          {/* Start Date */}
          {startDate && (
            <Card className="border-none shadow-md bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-amber-700 dark:text-amber-300">Challenge commencé le</p>
                    <p className="text-lg font-semibold text-amber-900 dark:text-amber-100">
                      {startDate}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-amber-500" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Settings */}
          <Card className="border-none shadow-lg bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-amber-900 dark:text-amber-100">Paramètres</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-amber-900 dark:text-amber-100">Thème</p>
                  <p className="text-sm text-amber-600 dark:text-amber-400">
                    {theme === 'light' ? 'Clair' : 'Sombre'}
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
                  <p className="font-medium text-amber-900 dark:text-amber-100">Notifications</p>
                  <p className="text-sm text-amber-600 dark:text-amber-400">Rappels du jour</p>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                  className="data-[state=checked]:bg-amber-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Export Data */}
          <Card className="border-none shadow-lg bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-amber-900 dark:text-amber-100">Export de données</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 hover:bg-amber-50 dark:hover:bg-amber-900/20"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Exporter le journal en PDF
              </Button>
              <Button
                variant="outline"
                className="w-full border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 hover:bg-amber-50 dark:hover:bg-amber-900/20"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Exporter la progression
              </Button>
            </CardContent>
          </Card>

          {/* Reset */}
          <Card className="border-none shadow-md bg-rose-100/50 dark:bg-rose-900/20 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-rose-800 dark:text-rose-200 mb-2">
                💜 Merci d'être sur ce journey Glow Up avec toi-même !
              </p>
              <Button
                variant="outline"
                size="sm"
                className="border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-900/30"
                onClick={() => {
                  if (confirm('Veux-tu vraiment recommencer le challenge ? Toute ta progression sera perdue.')) {
                    localStorage.removeItem('glowUpApp')
                    window.location.reload()
                  }
                }}
              >
                Recommencer le challenge
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const renderBottomNav = () => {
    if (currentTab === 'onboarding') return null

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
            <span className="text-xs font-medium">Accueil</span>
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
            <span className="text-xs font-medium">Challenge</span>
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
            <span className="text-xs font-medium">Journal</span>
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
            <span className="text-xs font-medium">Trackers</span>
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
            <span className="text-xs font-medium">Profil</span>
          </button>
        </div>
      </nav>
    )
  }

  return (
    <>
      {currentTab === 'onboarding' && renderOnboarding()}
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
              Félicitations ! 🎉
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
                Tu as complété le Jour {celebrationDay} ! ✨
              </p>
              <p className="text-amber-700 dark:text-amber-300">
                {celebrationDay === 30
                  ? "Tu as terminé les 30 jours du Glow Up Challenge ! Tu es incroyable !"
                  : "Tu as fait un pas de géant vers ta meilleure version. Continue comme ça !"}
              </p>
            </div>

            {celebrationDay < 30 && (
              <div className="p-4 bg-white/60 dark:bg-stone-800/60 rounded-lg text-center">
                <p className="text-amber-800 dark:text-amber-200 font-medium">
                  🌙 On se revoit demain pour le Jour {celebrationDay + 1} !
                </p>
                <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
                  Le nouveau jour sera débloqué à minuit
                </p>
              </div>
            )}

            {celebrationDay === 30 && (
              <div className="p-4 bg-gradient-to-br from-amber-100 to-rose-100 dark:from-amber-900/50 dark:to-rose-900/50 rounded-lg text-center">
                <p className="text-amber-900 dark:text-amber-100 font-medium">
                  💖 Tu as terminé le challenge ! Mais ce n'est que le début de ton Glow Up...
                </p>
              </div>
            )}

            <Button
              onClick={() => setShowCelebration(false)}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-semibold rounded-xl"
            >
              {celebrationDay === 30 ? 'Retour au dashboard' : 'Continuer'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {renderBottomNav()}
    </>
  )
}
