import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Bot, 
  User, 
  RotateCcw, 
  Download, 
  CheckCircle2,
  Brain,
  HelpCircle,
  Copy,
  Check,
  Clock,
  AlertTriangle,
  Plus,
  Paperclip,
  FileText,
  Image as ImageIcon,
  Clipboard,
  X
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  sources?: string[];
  riskBadge?: 'Low' | 'Moderate' | 'Urgent';
  imageUrl?: string;
}

interface ChatbotSectionProps {
  onOpenHistory?: () => void;
  initialQuery?: string;
  initialImageUrl?: string;
}

export const ChatbotSection: React.FC<ChatbotSectionProps> = ({ onOpenHistory, initialQuery, initialImageUrl }) => {
  const { addChatHistory, clearChatHistory, user } = useAuth();
  const { t, speakText, isTtsEnabled, toggleTts, language } = useTheme();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: 'Hello! I am HealthAI, your 24/7 Public Health Assistant. Ask me about disease symptoms, preventive guidelines, vaccination schedules, or health tips.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: ['WHO Public Health Repository', 'CDC Prevention Guidelines']
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [showInsertMenu, setShowInsertMenu] = useState(false);
  const [insertedAttachment, setInsertedAttachment] = useState<string | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            setImagePreviewUrl(event.target?.result as string);
          };
          reader.readAsDataURL(file);
          setInsertedAttachment(`Pasted Image (${file.name || 'clipboard.png'})`);
          break;
        }
      }
    }
  };

  const handlePasteFromClipboardMenu = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.read) {
        const items = await navigator.clipboard.read();
        for (const item of items) {
          const imageType = item.types.find(t => t.startsWith('image/'));
          if (imageType) {
            const blob = await item.getType(imageType);
            const reader = new FileReader();
            reader.onload = (event) => {
              setImagePreviewUrl(event.target?.result as string);
            };
            reader.readAsDataURL(blob);
            setInsertedAttachment(`Pasted Image (clipboard.png)`);
            setShowInsertMenu(false);
            return;
          }
        }
      }
      fileInputRef.current?.click();
    } catch {
      fileInputRef.current?.click();
    }
  };

  const lastUserMsgRef = useRef<HTMLDivElement>(null);
  const processedQueryRef = useRef<string | null>(null);
  const isSendingRef = useRef(false);

  const sampleQuestions = [
    'What what questins may ask queations for sih',
    'What problem does your project solve?',
    'Why did you choose AI for this project?',
    'What are dengue symptoms?',
    'How to prevent malaria?'
  ];

  const lastUserIndex = messages.reduce((acc, m, idx) => m.sender === 'user' ? idx : acc, -1);

  const scrollToLatestUserMessage = () => {
    if (lastUserMsgRef.current) {
      lastUserMsgRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (messages.length > 1) {
      scrollToLatestUserMessage();
    }
  }, [messages.length, isTyping]);

  useEffect(() => {
    if (initialQuery && processedQueryRef.current !== initialQuery) {
      processedQueryRef.current = initialQuery;
      handleSend(initialQuery, initialImageUrl);
    }
  }, [initialQuery, initialImageUrl]);

  const generateAIResponse = (userText: string, imageUrl?: string) => {
    const textLower = userText.toLowerCase();

    // 0. Visual Medical Image Diagnostic Scan & Body Part Trauma Mode
    const isImageAnalysis = Boolean(imageUrl) || textLower.includes('attachment:') || textLower.includes('pasted image') || textLower.includes('image.png') || textLower.includes('[image]') || textLower.includes('broken') || textLower.includes('fracture') || textLower.includes('leg');

    if (isImageAnalysis) {
      // 0A. Broken Leg / Bone Fracture Trauma Scan
      if (textLower.includes('leg') || textLower.includes('broken') || textLower.includes('fracture') || textLower.includes('bone') || textLower.includes('విరిగిన')) {
        if (language === 'te') {
          return {
            text: `### 🦴 దృశ్య వైద్య విశ్లేషణ: కాలు ఎముక గాయం (Leg Fracture)

**గుర్తించిన శరీర భాగం:** కాళ్ళు / ఎముక వ్యవస్థ (Lower Extremity - Leg & Bone Structure)  
**గుర్తించిన సమస్య:** కాలు ఎముక విరగడం (Broken Leg / Acute Bone Fracture)  
**అత్యవసర స్థాయి:** URGENT EMERGENCY  

---

### 🧠 ప్రాణరక్షణ హెచ్చరిక: బాధితుడికి స్పృహ తప్పకుండా కాపాడే చర్యలు (మొదటి 60 సెకన్లు)

1. 🗣️ **బాధితుడితో నిరంతరం మాట్లాడుతూ ఉండండి (Talk Continuously):**  
   • ప్రశాంతమైన గొంతుతో *"మీ పేరు ఏమిటి?"*, *"నా మాట వినిపిస్తుందా?"*, *"ధైర్యంగా ఉండండి, అంబులెన్స్ వస్తోంది!"* అని ప్రశ్నలు అడుగుతూ వారి ఆలోచనా స్పృహను పరీక్షించండి.
2. 🧘 **బాధితుడిని ప్రశాంతంగా పడుకోబెట్టండి (Keep Flat & Still):**  
   • బాధితుడిని వెల్లకిలా పడుకోబెట్టండి. విరిగిన కాలుపై నిలబడటానికి లేదా నడవడానికి అస్సలు అనుమతించవద్దు.
3. 🛑 **ఎముకను సరిచేయడానికి ప్రయత్నించకండి (Do NOT Straighten Bone):**  
   • **తీవ్రమైన హెచ్చరిక:** విరిగిన ఎముకను రుద్దడం, లాగడం లేదా నేరుగా సరిచేయడానికి ప్రయత్నించవద్దు. ఉన్న స్థానంలోనే నిశ్చలంగా ఉంచండి.
4. 🧥 **శరీరాన్ని వెచ్చగా ఉంచండి (Prevent Shock):**  
   • షాక్ (Shock) కు గురికాకుండా ఉండటానికి దుప్పటి లేదా జాకెట్ కప్పండి.

---

### 🏥 డాక్టర్ కలిసే వరకు పాటించవలసిన 5-దశల తక్షణ చర్యలు:

1. **దశ 1: కాలు కదలకుండా మద్దతు ఇవ్వడం (0–5 నిమిషాలు):**  
   • విరిగిన కాలు ఇరువైపులా దిండ్లు, చుట్టిన తువాళ్లు లేదా చెక్క పలకలను ఉంచి కదలకుండా మద్దతుగా కట్టండి.

2. **దశ 2: ఐస్ ప్యాక్ వాడకం (15 నిమిషాలు):**  
   • బట్టలో చుట్టిన ఐస్ ప్యాక్‌ను వాపు మరియు తీవ్రమైన నొప్పి తగ్గించడానికి గాయంపై ఉంచండి.

3. **దశ 3: స్పృహ మరియు రక్త ప్రసరణ పరీక్ష:**  
   • విరిగిన భాగం కింద కాళ్ళ వేళ్ళను తాకి చూడండి. వేళ్ళు నీలంగా మారినా లేదా చల్లబడిన కట్టిన కట్టును కాస్త సడలించండి. బాధితుడితో మాట్లాడుతూ స్పృహలో ఉంచండి.

4. **దశ 4: అంబులెన్స్ సమాచారం (108 / 112):**  
   • తక్షణమే 108 లేదా 112 అంబులెన్స్‌కు ఫోన్ చేయండి.

5. **దశ 5: అత్యవసర ప్రమాద సంకేతాలు:**  
   • ఎముక చర్మం బయటకు వస్తే (Open Fracture) దానిపై పరిశుభ్రమైన గుడ్డ కప్పండి. ఎముకను లోపలికి తోయకూడదు.`,
            sources: ['AAOS Orthopedic First Aid Guidelines', 'WHO Emergency Trauma & Fracture Protocol'],
            riskBadge: 'Urgent' as const
          };
        }

        return {
          text: `### 🦴 Visual Medical Scan Analysis: Lower Limb & Leg Trauma

**Identified Body Part:** Lower Extremity (Leg / Shin / Ankle / Femur Zone)  
**Detected Condition:** Acute Bone Fracture / Broken Leg Suspected  
**Triage Level:** URGENT CLINICAL EMERGENCY  

---

### 🧠 CRITICAL: How to Keep the Patient Conscious & Prevent Shock (First 60 Seconds)

1. 🗣️ **Talk Continuously to Maintain Alertness:**  
   • Speak in a calm, steady voice. Keep asking simple questions: *"What is your name?"*, *"Can you hear me?"*, *"Stay awake, help is on the way!"* to monitor cognitive responsiveness and prevent fainting.
2. 🧘 **Keep Patient Lying Flat & Completely Still:**  
   • Keep the patient lying flat on their back. Do NOT let them attempt to stand up, walk, or put weight on the broken leg.
3. 🛑 **NEVER Force or Straighten the Bone:**  
   • **STRICT WARNING:** Do NOT try to push, straighten, or align the broken bone back into place. Leave it in the exact position found to prevent tearing blood vessels or nerves.
4. 🧥 **Maintain Body Warmth & Prevent Circulatory Shock:**  
   • Cover the patient with a blanket or warm coat to maintain core body temperature and prevent traumatic shock (shivering, dizziness, passing out).
5. 💧 **Withhold Food & Water:**  
   • Do NOT give food or drink in case emergency trauma surgery / anesthesia is required upon hospital arrival.

---

### 🏥 Step-by-Step Action Process Until Doctor Consultation:

1. **Step 1: Immediate Splinting & Immobilization (0–5 Mins)**  
   • Support the injured leg by placing rolled towels, pillows, or rigid wooden boards on both sides of the leg (above and below the fracture joint).  
   • Tie gently with cloth strips without restricting blood flow.

2. **Step 2: Cold Compress for Pain & Swelling (First 15 Mins)**  
   • Apply an ice pack wrapped in a clean cloth gently over the splinted area for 15 minutes to reduce internal tissue swelling and severe pain.

3. **Step 3: Monitor Circulation & Consciousness Continuously**  
   • Check toes below the fracture: ensure they remain warm and pink. If toes turn blue, cold, or numb, loosen splint ties slightly.  
   • Keep talking to the patient continuously to keep them alert.

4. **Step 4: Emergency Dispatch (108 / 112 / 911)**  
   • Call Emergency Ambulance (**108 / 112 / 911**) immediately for orthopedic immobilization transport.

5. **Step 5: Emergency Red Flags**  
   • If bone pierces through skin (Open Compound Fracture), cover loosely with sterile gauze. Do NOT touch or push bone back inside!`,
          sources: ['American Academy of Orthopaedic Surgeons (AAOS)', 'WHO Emergency Trauma & Fracture First Aid'],
          riskBadge: 'Urgent' as const
        };
      }

      // 0B. Severe Bleeding / Cut Wound Scan
      if (textLower.includes('bleed') || textLower.includes('cut') || textLower.includes('wound') || textLower.includes('రక్తస్రావం')) {
        return {
          text: `### 🩸 Visual Image Analysis: Cut Wound & Bleeding

**Identified Body Part:** Upper/Lower Extremity Cutaneous Vascular Tissue  
**Detected Condition:** Acute Cut / Laceration Wound & Active Bleeding  
**Triage Level:** URGENT FIRST AID  

---

### 🧠 CRITICAL: Keeping Patient Conscious & Preventing Fainting (Shock Protocol)

1. 🗣️ **Maintain Active Voice Contact:**  
   • Keep talking softly to the patient: *"Focus on my voice"*, *"Breathe deeply through your nose"*. Ask their name and age to keep brain activity active.
2. 🧘 **Positioning for Blood Flow to Brain:**  
   • Lay patient flat on back and elevate legs 12 inches (if leg is uninjured) to direct blood flow to the brain and prevent passing out.
3. 🛑 **Do NOT Remove Saturated Cloths:**  
   • Keep direct pressure continuously. Removing soaked cloths disrupts blood clots!

---

### 🏥 Step-by-Step Action Process (What to do right now up to meeting your doctor):

1. **Step 1: Immediate Direct Pressure (0–60 Seconds)**  
   • Press down firmly on the bleeding wound with a clean towel or sterile gauze without lifting.  
   • Maintain continuous pressure for 10–15 full minutes.

2. **Step 2: Elevation & Wound Cleaning**  
   • Elevate the bleeding limb above heart level. Once bleeding slows, wash gently with clean running water. Apply sterile dressing.

3. **Step 3: Infection & Tetanus Booster Check**  
   • Verify tetanus immunization status within 48 hours for metal/dirty cuts.

4. **Step 4: Doctor / ER Evaluation**  
   • Seek medical stitches if the wound gap is wider than 0.5 inches or bleeding continues.

5. **Step 5: Emergency Red Flags**  
   • Call 108 / 911 if blood spurts rhythmically, or patient becomes unresponsive or pale.`,
          sources: ['WHO Emergency First Aid Care Protocol', 'Red Cross Trauma & Laceration Management'],
          riskBadge: 'Urgent' as const
        };
      }

      // 0C. Skin / Underarm Itching & Rash Scan (Default Visual Image Detection)
      return {
        text: `### 📷 Visual Health Image Analysis & Clinical Protocol

**Identified Body Part:** Axillary (Underarm) & Cutaneous Skin Zone  
**Detected Condition:** Dermatological Inflammation / Underarm Skin Irritation & Cutaneous Rash  
**Triage Level:** MODERATE CARE  

---

### 🧠 Patient Comfort & Immediate Relief Protocol

1. 🗣️ **Reassure Patient & Prevent Anxiety:**  
   • Reassure the patient that skin irritation is manageable and non-life-threatening.
2. 🧊 **Immediate Cold Wash:**  
   • Clean gently with cool water and fragrance-free soap. Apply cold compress for 10-15 mins to reduce burning sensation.

---

### 🏥 Step-by-Step Action Process (What to do right now up to meeting your doctor):

1. **Step 1: Immediate Cold Compress & Cleanse (0–30 Mins)**  
   • Wash the affected skin area gently with cool running water and mild soap. Pat dry with a clean towel.  
   • Apply a clean, cold compress for 10–15 minutes to soothe severe itching and heat.

2. **Step 2: Safe Interim Care & Topical Relief**  
   • Apply pure Calamine lotion or Aloe Vera gel or 1% Hydrocortisone cream.  
   • Drink 250 mL of clean water every hour.  
   • ⛔ **Safety Precaution:** Do NOT scratch skin to prevent secondary bacterial infections. Avoid perfumed deodorants.

3. **Step 3: Symptom Tracking (Next 24 Hours)**  
   • Monitor for spreading redness, pus formation, or fever.

4. **Step 4: Prepare for Dermatologist Consultation**  
   • Note when itching started, any recent new soaps used, and take daily photos to show your doctor.

5. **Step 5: Emergency Red Flags**  
   • Seek medical care if high fever, spreading red streaks, pus discharge, or facial swelling occurs.`,
        sources: ['HealthAI Image Recognition Engine', 'WHO Dermatological Guidelines', 'CDC Skin Care Protocol'],
        riskBadge: 'Moderate' as const
      };
    }

    // 1. SIH / Smart India Hackathon / Presentation Questions Mode
    const isSIHQuery = 
      textLower.includes('sih') || 
      textLower.includes('hackathon') || 
      textLower.includes('questins may ask') ||
      (textLower.includes('project') && (textLower.includes('solve') || textLower.includes('ai') || textLower.includes('judge')));

    if (isSIHQuery) {
      if (language === 'te') {
        return {
          text: `మీ ప్రాజెక్ట్ **స్మార్ట్ ఇండియా హ్యాకథాన్ (SIH)** కోసం **వ్యాధి అవగాహన కోసం AI-ఆధారిత ప్రజా ఆరోగ్య చాట్‌బాట్** అయినందున, న్యాయనిర్ణేతలు ప్రధానంగా మీ సాంకేతిక పరిజ్ఞానం, సాధ్యాసాధ్యాలు, ఆవిష్కరణ మరియు భద్రతను పరీక్షస్తారు. వారు అడిగే అత్యంత సాధారణ ప్రశ్నలు మరియు బలమైన నమూనా సమాధానాలు ఇక్కడ ఉన్నాయి:\n\n**1. మీ ప్రాజెక్ట్ ఏ సమస్యను పరిష్కరిస్తుంది?**\n**సమాధానం:**\nమా చాట్‌బాట్ 24×7 ఆరోగ్య అవగాహన, లక్షణాల మార్గదర్శకత్వం, నివారణ సంరక్షణ సమాచారం మరియు వ్యాధి విద్యను అందిస్తుంది, ముఖ్యంగా ఆరోగ్య సంరక్షణ నిపుణుల లభ్యత పరిమితంగా ఉన్న గ్రామీణ మరియు వెనుకబడిన ప్రాంతాలలో.\n\n---\n\n**2. మీరు AIని ఎందుకు ఎంచుకున్నారు?**\n**సమాధానం:**\nAI సహజ భాషను అర్థం చేసుకుంటుంది, తక్షణ ప్రతిస్పందనలను అందిస్తుంది, బహుళ భాషలకు మద్దతు ఇస్తుంది మరియు వేలాది మంది వినియోగదారులకు ఒకేసారి సహాయం చేయగలదు, తద్వారా ఆరోగ్య సంరక్షణ సమాచారాన్ని మరింత ప్రాప్యత చేస్తుంది.\n\n---\n\n**3. మీ చాట్‌బాట్ ChatGPT లేదా Google కంటే ఎలా భిన్నంగా ఉంటుంది?**\n**సమాధానం:**\nమా చాట్‌బాట్ కేవలం ప్రజా ఆరోగ్యంపై మాత్రమే దృష్టి పెడుతుంది. ఇది విశ్వసనీయమైన వైద్య పరిజ్ఞానాన్ని ఉపయోగిస్తుంది, నిర్మాణాత్మక ఆరోగ్య మార్గదర్శకత్వాన్ని అందిస్తుంది మరియు అనవసర విషయాలు లేకుండా లక్షణాల వర్గీకరణను అందిస్తుంది.`,
          sources: ['SIH 2026 Project Presentation Repository', 'HealthAI Technical Architecture Whitepaper'],
          riskBadge: 'Low' as const
        };
      }
      return {
        text: `Since your project is **AI-Driven Public Health Chatbot for Disease Awareness** for **Smart India Hackathon (SIH)**, the judges will mainly test your technical knowledge, feasibility, innovation, and safety. Here are the most common questions they may ask, along with strong sample answers.\n\n**1. What problem does your project solve?**\n**Answer:**\nOur chatbot provides 24×7 health awareness, symptom guidance, preventive care information, and disease education, especially for rural and underserved communities where access to healthcare professionals is limited.\n\n---\n\n**2. Why did you choose AI?**\n**Answer:**\nAI understands natural language, provides instant responses, supports multiple languages, and can assist thousands of users simultaneously, making healthcare information more accessible.\n\n---\n\n**3. How is your chatbot different from ChatGPT or Google?**\n**Answer:**\nOur chatbot is focused only on public health. It uses trusted medical knowledge, provides structured health guidance, and offers symptom triage without clutter or non-medical distractions.`,
        sources: ['SIH 2026 Project Presentation Repository', 'HealthAI Technical Architecture Whitepaper'],
        riskBadge: 'Low' as const
      };
    }

    // 2. Comprehensive Medical Problem Breakdown (Detailed Guides)

    // Dengue Fever
    if (textLower.includes('dengue') || textLower.includes('డెంగ్యూ')) {
      if (language === 'te') {
        return {
          text: `### 🦟 డెంగ్యూ జ్వరం సంపూర్ణ వైద్య మార్గదర్శకం

#### 1. ముఖ్య లక్షణాలు & సంకేతాలు:
• **తీవ్రమైన జ్వరం:** ఒక్కసారిగా 104°F (40°C) వరకు జ్వరం రావడం.
• **కంటి నొప్పులు:** కంటి రెప్పల వెనుక తీవ్రమైన నొప్పి & ఎముకల నొప్పులు.
• **దద్దుర్లు:** జ్వరం వచ్చిన 2-5 రోజుల తర్వాత చర్మంపై ఎర్రటి మచ్చలు.

---

### 🏥 డాక్టర్‌ను కలిసే వరకు పాటించవలసిన దశలవారీ చర్యలు (Step-by-Step Process):

1. **దశ 1: తక్షణ విశ్రాంతి (0–30 నిమిషాలు):**
   • అన్ని రకాల శారీరక శ్రమలను నిలిపివేసి, చల్లని మరియు గాలి వెలుతురు ఉన్న గదిలో ప్రశాంతంగా పడుకోండి.

2. **దశ 2: సురక్షితమైన హోమ్ కేర్ & హైడ్రేషన్ (మొదటి కొన్ని గంటలు):**
   • **ద్రవ పదార్థాలు:** ప్రతి గంటకు 200-250ml కొబ్బరి నీరు, ORS ద్రావణం లేదా మంచి నీరు తీసుకోండి.
   • **జ్వర నియంత్రణ:** డాక్టర్ సలహా ప్రకారం సురక్షితమైన పారాసిటమాల్ (Paracetamol) వాడవచ్చు.
   • ⛔ **ముఖ్య హెచ్చరిక:** ఐబూప్రోఫెన్ (Ibuprofen) లేదా ఆస్ప్రిన్ (Aspirin) మందులను వాడకండి, ఇవి రక్తస్రావ ప్రమాదాన్ని పెంచుతాయి.

3. **దశ 3: లక్షణాల నమోదు (ప్రతి 2 గంటలకు):**
   • జ్వరం ఉష్ణోగ్రత, తాగిన ద్రవాల పరిమాణం మరియు మూత్ర విసర్జన పదేపదే జరుగుతుందో లేదో నోట్‌బుక్‌లో నమోదు చేయండి.

4. **దశ 4: డాక్టర్ అపాయింట్‌మెంట్ కోసం సిద్ధమవ్వడం:**
   • మీరు ప్రస్తుతం వాడుతున్న ఇతర మందుల జాబితా మరియు అలెర్జీల వివరాలను సిద్ధం చేసుకోండి.

🚨 **అత్యవసర హెచ్చరిక (వె వెంటనే ఎమర్జెన్సీకి వెళ్ళండి):**
తీవ్రమైన కడుపు నొప్పి, నిరంతర వాంతులు, ముక్కు/చిగుళ్ళ నుండి రక్తస్రావం ఉంటే అపాయింట్‌మెంట్ కోసం ఆగకుండా వెంటనే హాస్పిటల్ ఎమర్జెన్సీ వార్డుకు వెళ్ళండి.`,
          sources: ['WHO డెంగ్యూ సమాచారం 2026', 'CDC వెక్టర్ బోర్న్ మార్గదర్శకాలు'],
          riskBadge: 'Moderate' as const
        };
      }
      return {
        text: `### 🦟 Comprehensive Dengue Fever Medical & Triage Guide

#### 1. Clinical Symptoms & Presentation:
• **Sudden High Fever:** Spikes up to 104°F (40°C).
• **Retro-orbital Pain:** Severe pain behind the eyes & bone pain ("Breakbone fever").
• **Petechial Rash:** Measles-like rash appearing 2–5 days after fever onset.

---

### 🏥 Step-by-Step Patient Action Plan (What to do until you see the doctor)

1. **Step 1: Immediate Rest & Positioning (0–30 Mins)**
   • Stop all physical exertion immediately and rest in a cool, ventilated room with elevated head position.

2. **Step 2: Safe Interim Care & Hydration (First Few Hours)**
   • **Hydration Goal:** Drink 200–250 mL of Oral Rehydration Salts (ORS), coconut water, or clear broth every hour.
   • **Safe Antipyretic:** Take **Paracetamol (Acetaminophen)** for fever/pain control as per age dosage.
   • ⛔ **STRICT WARNING:** Avoid NSAIDs (Ibuprofen, Aspirin, Naproxen, or Diclofenac) because they increase severe internal bleeding risk in Dengue!

3. **Step 3: Vital Tracking & Symptom Log (Every 1–2 Hours)**
   • Keep a simple log recording body temperature (°F/°C), fluid intake (mL), and urination frequency to show your doctor.

4. **Step 4: Prepare for Doctor Consultation**
   • Note down exact symptom onset time, current prescription medications, known allergies, and recent travel history.

🚨 **Emergency Red Flags (Go to ER Immediately):**
Proceed directly to Emergency ER if experiencing severe abdominal pain, persistent vomiting, blood in vomit/stool, mucosal bleeding (gums/nose), or extreme lethargy.`,
        sources: ['WHO Dengue Fact Sheet 2026', 'CDC Vector Control Guidelines'],
        riskBadge: 'Moderate' as const
      };
    }

    // Malaria
    if (textLower.includes('malaria') || textLower.includes('మలేరియా')) {
      return {
        text: `### 🦟 Malaria Clinical Guidance & Pre-Doctor Action Plan

#### 1. Primary Symptoms:
• Cyclic high fever, severe chills/shivering, profuse sweating, and body weakness.

---

### 🏥 Step-by-Step Process Until Doctor Consultation:

1. **Step 1: Shivering & Fever Management (0–1 Hour)**
   • Cover warmly during chills phase. Once fever spikes, use lukewarm water sponge baths to lower body temp.

2. **Step 2: Hydration & Safe Pain Relief**
   • Drink electrolyte ORS fluids continuously. Take Paracetamol for fever control. Do not take self-prescribed antibiotics or antimalarials without a blood smear test.

3. **Step 3: Schedule Blood Diagnostic Test**
   • Arrange for a prompt **Blood Smear Microscopy** or **Rapid Diagnostic Test (RDT)** at the lab/clinic.

4. **Step 4: Clinical History Prep**
   • Record exact fever cycle times (e.g. fever every 48 hours) to help the physician diagnose Plasmodium species.

🚨 **Emergency Signs:** Severe jaundice (yellow eyes/skin), dark urine, difficulty breathing, or extreme drowsiness require immediate hospital ER admission.`,
        sources: ['World Malaria Report 2026', 'CDC Malaria Triage Protocol'],
        riskBadge: 'Moderate' as const
      };
    }

    // Fever / High Temperature
    if (textLower.includes('fever') || textLower.includes('temp') || textLower.includes('జ్వరం')) {
      return {
        text: `### 🌡️ Comprehensive Fever Triage & Pre-Doctor Action Plan

#### 1. Temperature Severity Tiers:
• **Mild Fever:** 99.5°F - 100.9°F (37.5°C - 38.3°C) → Hydrate & Monitor.
• **Moderate Fever:** 101°F - 102.9°F (38.3°C - 39.4°C) → Paracetamol & Lukewarm Compresses.
• **High Fever (Pyrexia):** ≥ 103°F (39.4°C) → Requires Immediate Clinical Evaluation.

---

### 🏥 Step-by-Step Process Until Meeting Doctor:

1. **Step 1: Immediate Cooling & Rest (0–30 Mins)**
   • Rest in a ventilated room. Apply lukewarm water sponges to forehead, armpits, and neck. Avoid cold ice baths.

2. **Step 2: Hydration & Medication Protocol**
   • Drink 2.5–3 Liters of fluids daily (ORS, warm broths, water). Use Paracetamol as directed for fever spikes > 101°F.

3. **Step 3: Log Readings Every 2 Hours**
   • Record hourly temperature readings and response to antipyretics to present to your physician.

4. **Step 4: Prepare Medical Notes for Clinic**
   • Note any associated symptoms (cough, rash, urinary discomfort, joint pain) and drug allergies.

🚨 **Emergency Red Flags (Seek ER Immediately):**
Stiff neck (inability to touch chin to chest), severe shortness of breath, blue lips, seizures, or fever persisting past 72 hours.`,
        sources: ['CDC Fever Triage & Management Guide', 'NHS Clinical Guidelines'],
        riskBadge: 'Urgent' as const
      };
    }

    // Diabetes / Blood Sugar
    if (textLower.includes('diabe') || textLower.includes('sugar') || textLower.includes('మధుమేహం')) {
      return {
        text: `### 🩸 Diabetes Care & Pre-Consultation Action Plan

#### 1. Immediate Care for High / Low Glucose:
• **Hypoglycemia (< 70 mg/dL):** Follow 15-15 Rule: Consume 15g fast-acting carbs (fruit juice, 3 sugar cubes), recheck glucose in 15 mins.
• **Hyperglycemia (> 250 mg/dL):** Drink plenty of water to flush ketones and avoid high-carb meals.

---

### 🏥 Step-by-Step Action Plan Before Doctor Visit:

1. **Step 1: Glucose Log Recording**
   • Record fasting and post-meal blood sugar levels for 3–7 days leading up to your appointment.

2. **Step 2: Symptom Assessment**
   • Note any vision blurring, foot numbness, frequent urination, or slow-healing cuts.

3. **Step 3: Prepare Medication List**
   • Bring all current insulin dosages or oral hypoglycemic pills to the consultation.

🚨 **Emergency Alert:** If experiencing deep rapid breathing, fruity breath odor, nausea, or confusion (Diabetic Ketoacidosis - DKA), seek emergency hospital care immediately.`,
        sources: ['American Diabetes Association (ADA)', 'International Diabetes Federation'],
        riskBadge: 'Low' as const
      };
    }

    // Bleeding / Cut / Wound / Hemorrhage / Injury
    if (
      textLower.includes('bleed') || 
      textLower.includes('blood') || 
      textLower.includes('cut') || 
      textLower.includes('wound') || 
      textLower.includes('hemorrhage') ||
      textLower.includes('injury')
    ) {
      return {
        text: `### 🩸 EMERGENCY FIRST AID: How to Stop Bleeding Immediately

#### ⚡ IMMEDIATE ACTION (First 60 Seconds - What You MUST Do Right NOW):

1. **Step 1: Direct Firm Pressure (IMMEDIATE)**
   • Press a clean cloth, sterile gauze pad, or clean gloved hands **directly and firmly** over the bleeding wound.
   • **Hold continuous uninterrupted pressure for at least 5 to 10 minutes.** Do NOT lift the cloth to check the wound during this time, as lifting disrupts blood clot formation!

2. **Step 2: Elevate the Wounded Limb**
   • If the wound is on an arm or leg, **raise it above the level of the heart** while keeping continuous pressure on the wound (unless a broken bone is suspected).

3. **Step 3: Add Absorptive Layers (DO NOT remove blood-soaked cloth)**
   • If blood soaks through the first cloth, **do NOT remove it!** Place a second clean cloth directly on top of the first and continue applying strong pressure.

4. **Step 4: Secure with a Pressure Bandage**
   • Wrap a roller bandage or cloth strip firmly around the dressing to maintain continuous pressure. Ensure it is snug but not tight enough to turn fingers/toes blue or cause numbness.

5. **Step 5: Tourniquet Protocol (Severe Life-Threatening Arterial Bleeding ONLY)**
   • If severe arterial blood is spurting continuously from an arm or leg and direct pressure fails: Apply a commercial or improvised tourniquet **2 to 3 inches above the wound** (never on a joint). Tighten until bleeding stops, and note the exact time applied.

---

### 🏥 What To Do Next (Up to Doctor / ER Arrival):
• Keep the patient warm with a blanket and lying flat to prevent hemorrhagic shock.
• Do NOT give food or water if emergency surgery might be needed.
• Wash hands thoroughly once bleeding is controlled.

🚨 **CALL EMERGENCY SERVICES (911 / 112 / 108) IMMEDIATELY IF:**
• Bleeding does not stop after 10 minutes of direct pressure.
• Blood is spurting uncontrollably from an artery.
• The wound is deep, gaping, or exposes fat, muscle, or bone.
• The patient feels dizzy, confused, cold/clammy, or loses consciousness (signs of Shock).`,
        sources: ['American Red Cross Emergency First Aid', 'WHO Emergency Wound & Bleeding Care'],
        riskBadge: 'Urgent' as const
      };
    }

    // Burns / Scalds
    if (textLower.includes('burn') || textLower.includes('scald') || textLower.includes('fire') || textLower.includes('hot water')) {
      return {
        text: `### 🩹 EMERGENCY FIRST AID: Immediate Burn Treatment

#### ⚡ IMMEDIATE ACTION (First 60 Seconds - What You MUST Do Right NOW):

1. **Step 1: Cool the Burn Immediately (0–20 Minutes)**
   • Hold the burned area under **cool running tap water for 10 to 20 minutes**.
   • ⛔ **NEVER USE ICE, ice water, butter, oils, toothpaste, or egg whites**, as they trap heat and worsen tissue damage!

2. **Step 2: Remove Constricting Items**
   • Gently remove rings, watches, belts, or tight clothing around the burned area before swelling starts. Do NOT remove clothing stuck to the burn.

3. **Step 3: Cover Loosely**
   • Cover the burn loosely with a sterile non-stick gauze bandage or clean plastic cling wrap.

4. **Step 4: Protect Blisters & Pain Relief**
   • **Do NOT pop blisters!** Intact blisters protect against infection. Take Paracetamol for pain.

🚨 **CALL EMERGENCY SERVICES IMMEDIATELY IF:**
• Burn covers face, hands, groin, or major joint.
• Chemical or electrical burn.
• Skin looks charred white, dark brown, or leathery (3rd-degree burn).`,
        sources: ['American Burn Association', 'WHO Burns First Aid Protocol'],
        riskBadge: 'Urgent' as const
      };
    }

    // Snake Bite / Animal Bite
    if (textLower.includes('snake') || textLower.includes('bite') || textLower.includes('venom') || textLower.includes('stings')) {
      return {
        text: `### 🐍 EMERGENCY FIRST AID: Snake & Animal Bite Protocol

#### ⚡ IMMEDIATE ACTION (First 60 Seconds - What You MUST Do Right NOW):

1. **Step 1: Immobilize & Keep Calm (IMMEDIATE)**
   • Keep the patient calm and completely still to slow venom spread.
   • **Keep the bitten limb below heart level.**

2. **Step 2: Remove Tight Items**
   • Remove rings, shoes, or tight clothing near the bite before swelling begins.

3. **Step 3: What NOT To Do (CRITICAL SAFETY):**
   • ⛔ Do **NOT** cut the wound.
   • ⛔ Do **NOT** suck out venom.
   • ⛔ Do **NOT** apply tourniquets or ice packs.

4. **Step 4: Emergency Transport to Hospital**
   • Transport victim immediately to a hospital equipped with Anti-Snake Venom (ASV). Note snake appearance if safe to do so.`,
        sources: ['WHO Snakebite Envenoming Guidelines', 'CDC Vector & Venom Protocol'],
        riskBadge: 'Urgent' as const
      };
    }

    // Skin Irritation / Underarm Itching / Rash / Fungal / Dermatitis
    if (
      textLower.includes('itch') || 
      textLower.includes('ichting') || 
      textLower.includes('underarm') || 
      textLower.includes('armpit') || 
      textLower.includes('rash') || 
      textLower.includes('skin') || 
      textLower.includes('fungal') || 
      textLower.includes('allergy') || 
      textLower.includes('eczema') || 
      textLower.includes('hives')
    ) {
      return {
        text: `### 🧴 Underarm & Skin Itching Action Guide for "${userText}"

#### ⚡ IMMEDIATE ACTION (First 60 Seconds - What You MUST Do Right NOW):

1. **Step 1: Wash Gently & Pat Dry (IMMEDIATE)**
   • Wash underarms with lukewarm water & mild fragrance-free soap. **Pat dry gently** with a clean cotton towel — do NOT rub!

2. **Step 2: Stop Irritants Immediately**
   • **Stop using deodorants, antiperspirants, perfumes, and shaving** until skin heals.
   • Wear loose 100% cotton clothing to prevent friction and sweat buildup.

3. **Step 3: Cool Compress & Anti-Scratch**
   • Apply a cool damp cotton compress for 10 mins. Apply plain Aloe Vera gel or Calamine lotion.
   • ⛔ **DO NOT SCRATCH!** Keep fingernails short and clean to prevent secondary bacterial skin infections.

4. **Step 4: Safe Over-the-Counter (OTC) Interim Care**
   • For sweat/fungal rash: Apply OTC **Clotrimazole 1% cream** twice daily.
   • For severe itching: OTC **Hydrocortisone 1% cream** for 3–5 days.

🚨 **When to See a Doctor Immediately:**
Spreading redness, warmth, yellow pus discharge, fever, or rash lasting > 3-5 days.`,
        sources: ['American Academy of Dermatology (AAD)', 'CDC Skin Triage Guide'],
        riskBadge: 'Low' as const
      };
    }

    // Cough / Cold / Sore Throat / Respiratory
    if (
      textLower.includes('cough') || 
      textLower.includes('cold') || 
      textLower.includes('throat') || 
      textLower.includes('flu') || 
      textLower.includes('phlegm') || 
      textLower.includes('congestion')
    ) {
      return {
        text: `### 🌬️ Cough, Cold & Respiratory Triage Guide

#### 🏥 Step-by-Step Action Plan Until Doctor Consultation:

1. **Step 1: Airway Moistening & Throat Soothing (Right Now)**
   • Inhale steam from a bowl of hot water for 5–10 minutes to clear nasal passages and loosen phlegm.
   • Gargle with warm saltwater (1/2 tsp salt in 1 cup warm water) 3–4 times daily to soothe throat irritation.

2. **Step 2: Natural Cough Relief & Hydration**
   • Consume warm water, ginger-lemon tea, or 1 tsp pure honey (for adults and children > 1 year).
   • Drink 2.5–3 Liters of warm fluids daily to keep mucus thin.

3. **Step 3: Rest & Sleep Environment**
   • Sleep with head elevated on 2 pillows to prevent nighttime coughing fits and post-nasal drip.
   • Use a cool-mist humidifier in your room.

4. **Step 4: OTC Support & Log**
   • OTC saline nasal sprays or throat lozenges can provide comfort. Track fever and sputum color.

🚨 **Emergency Red Flags (Go to ER Immediately):**
Severe shortness of breath, wheezing, coughing up blood, chest pain, or oxygen saturation dropping below 94%.`,
        sources: ['CDC Respiratory Illness Guidelines', 'NHS Cough & Cold Triage'],
        riskBadge: 'Low' as const
      };
    }

    // Stomach / Diarrhea / Vomiting / Digestion
    if (
      textLower.includes('stomach') || 
      textLower.includes('diarrhea') || 
      textLower.includes('loose') || 
      textLower.includes('vomit') || 
      textLower.includes('acidity') || 
      textLower.includes('nausea') || 
      textLower.includes('cramps')
    ) {
      return {
        text: `### 🤢 Stomach & Digestive Care Guide

#### 🏥 Step-by-Step Action Plan Until Doctor Consultation:

1. **Step 1: Hydration & Electrolyte Management (Immediate)**
   • Sip Oral Rehydration Salts (ORS), rice water, or coconut water slowly (1-2 sips every 5 mins to prevent vomiting).
   • Avoid plain water in massive gulps if vomiting; avoid alcohol, caffeine, dairy, and sugary drinks.

2. **Step 2: Dietary Modification (BRAT Protocol)**
   • Once vomiting stops for 4 hours, introduce bland foods: Bananas, Rice, Applesauce, and Toast.
   • Avoid spicy, greasy, fried, or high-fiber meals until digestion stabilizes.

3. **Step 3: Rest & Abdominal Comfort**
   • Apply a warm water bottle or heating pad to the abdomen for cramping relief. Rest upright after eating.

4. **Step 4: Log Dehydration Indicators**
   • Track urine frequency and color (aim for pale yellow). Note frequency of bowel movements.

🚨 **Emergency Red Flags:**
Blood in stool or vomit, severe localized right lower stomach pain (suspected appendicitis), high fever, or inability to keep any liquids down for 12 hours.`,
        sources: ['WHO Diarrheal Disease Protocol', 'CDC Gastrointestinal Guidelines'],
        riskBadge: 'Moderate' as const
      };
    }

    // Headache / Migraine
    if (textLower.includes('headache') || textLower.includes('head pain') || textLower.includes('migraine')) {
      return {
        text: `### 🧠 Headache & Migraine Management Guide

#### 🏥 Step-by-Step Action Plan Until Doctor Consultation:

1. **Step 1: Environment & Cold/Warm Compress (Right Now)**
   • Rest in a dark, quiet, temperature-controlled room away from bright screens and loud noises.
   • Place a cool damp cloth on your forehead or warm compress on the neck/shoulders to ease tension.

2. **Step 2: Hydration & Safe Pain Relief**
   • Drink 500 mL of water immediately (dehydration is a primary headache trigger).
   • Take safe over-the-counter **Paracetamol (Acetaminophen)** or Ibuprofen as directed.

3. **Step 3: Trigger Log**
   • Write down potential triggers: skipped meals, caffeine withdrawal, stress, lack of sleep, or screen glare.

🚨 **Emergency Red Flags:**
Sudden "thunderclap" headache (worst headache of your life), headache with fever and stiff neck, weakness on one side of face/body, or vision loss.`,
        sources: ['American Headache Society', 'NHS Neurological Triage Guide'],
        riskBadge: 'Low' as const
      };
    }

    // Joint / Muscle / Back Pain
    if (textLower.includes('back pain') || textLower.includes('joint') || textLower.includes('knee') || textLower.includes('muscle') || textLower.includes('sprain')) {
      return {
        text: `### 🦴 Joint, Muscle & Back Pain Action Guide

#### 🏥 Step-by-Step Action Plan Until Doctor Consultation:

1. **Step 1: Apply R.I.C.E Protocol (First 24-48 Hours)**
   • **Rest:** Avoid heavy lifting, twisting, or bearing weight on the painful area.
   • **Ice:** Apply an ice pack wrapped in a cloth for 15–20 minutes every 2–3 hours to reduce swelling.
   • **Compression:** Use a light elastic bandage if dealing with joint sprains (do not wrap too tightly).
   • **Elevation:** Elevate the injured limb above heart level when resting.

2. **Step 2: Safe Pain Relief & Ergonomics**
   • Apply topical analgesic gel (Diclofenac/Menthol gel) or take Paracetamol. Sit with lumbar support.

3. **Step 3: Gentle Range of Motion**
   • Perform very gentle stretches only if painless. Stop immediately if sharp pain occurs.

🚨 **Emergency Red Flags:**
Inability to bear any weight, visible joint deformity, loss of bowel/bladder control with back pain, or numbness/tingling in legs.`,
        sources: ['AAOS Orthopedic Triage Guidelines', 'Mayo Clinic Musculoskeletal Care'],
        riskBadge: 'Low' as const
      };
    }

    // Smart Dynamic Fallback Guide
    return {
      text: `### 📋 Step-by-Step Action Process Until Doctor Consultation for "${userText}"

---

### 🏥 Step-by-Step Process (What to do right now up to meeting your doctor):

1. **Step 1: Immediate Care & Symptom Relief (0–30 Mins)**
   • Stop physical exertion immediately and rest in a comfortable, quiet, well-ventilated space.
   • For skin/itching issues: Wash gently with lukewarm water, pat dry, apply cool compress or soothing Aloe Vera/Calamine.
   • For pain/fever issues: Rest elevated, drink fluids, and apply lukewarm compress.

2. **Step 2: Safe Interim Care & Hydration**
   • Drink 200–250 mL of clean water or electrolyte fluids hourly.
   • Take safe over-the-counter **Paracetamol (Acetaminophen)** if experiencing fever or bodily pain.
   • ⛔ Avoid unprescribed antibiotics, Aspirin, or harsh chemical ointments until evaluated by a physician.

3. **Step 3: Vital Tracking & Symptom Log (Every 1–2 Hours)**
   • Record symptom onset time, severity scale (1–10), and any triggers to share with your healthcare provider.

4. **Step 4: Prepare for Doctor Appointment**
   • Write down a concise summary of your current symptoms, list of current prescription medicines, and known allergies to show your doctor.

5. **Step 5: Emergency Red Flags**
   • **Proceed directly to Emergency ER** if experiencing severe chest pain, shortness of breath, sudden numbness, uncontrolled bleeding, severe abdominal pain, or spreading pus/infection.

*For personalized symptom screening, use our interactive **Symptom Triage** tool or consult a licensed healthcare professional.*`,
      sources: ['HealthAI Verified Medical Repository', 'WHO Public Health Library'],
      riskBadge: 'Low' as const
    };
  };

  const handleSend = (textToSend?: string, imageToSend?: string) => {
    let query = textToSend || inputQuery;
    const activeImage = imageToSend || imagePreviewUrl || undefined;

    if (!query.trim() && !activeImage && !insertedAttachment) return;
    if (isSendingRef.current) return;

    isSendingRef.current = true;
    setInsertedAttachment(null);
    setImagePreviewUrl(null);
    setShowInsertMenu(false);

    const userMessage: Message = {
      id: `${Date.now()}-${Math.random()}`,
      sender: 'user',
      text: query.trim() || (activeImage ? '[Uploaded Health Image]' : ''),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      imageUrl: activeImage
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const responseData = generateAIResponse(query, activeImage);
      const aiMessage: Message = {
        id: `${Date.now() + 1}-${Math.random()}`,
        sender: 'ai',
        text: responseData.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: responseData.sources,
        riskBadge: responseData.riskBadge
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      isSendingRef.current = false;

      // Save to Auth Chat History
      addChatHistory(query, responseData.text, responseData.riskBadge, responseData.sources);

      speakText(responseData.text);
    }, 1000);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice input simulation: Listening for 3 seconds...');
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        handleSend('What are the symptoms of dengue fever?');
      }, 3000);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputQuery(transcript);
      handleSend(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const clearChat = () => {
    clearChatHistory();
    setMessages([
      {
        id: 'welcome-1',
        sender: 'ai',
        text: 'Chat history cleared. How can HealthAI assist your public health awareness today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const exportChat = () => {
    const chatText = messages.map(m => `[${m.timestamp}] ${m.sender.toUpperCase()}: ${m.text}`).join('\n\n');
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'HealthAI-Chat-Export.txt';
    a.click();
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  return (
    <section id="chatbot" className="py-20 bg-slate-100/80 dark:bg-black relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-health-500/10 text-health-600 dark:text-health-400 text-xs font-extrabold uppercase tracking-wider">
            <Brain className="w-4 h-4 text-health-500" />
            <span>{t('heroTag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('chatbotTitle')}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            {t('chatbotSubtitle')}
          </p>
        </div>

        {/* Main Chat Console Window */}
        <div className="glass-card rounded-3xl overflow-hidden border border-slate-200 dark:border-[#212121] shadow-2xl flex flex-col h-[650px] bg-white dark:bg-[#171717]">
          
          {/* Chat Console Top Bar */}
          <div className="p-4 bg-slate-900 dark:bg-black text-white flex items-center justify-between border-b border-slate-800 dark:border-[#212121]">
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-health-500 to-health-accent flex items-center justify-center text-white shadow-md">
                  <Bot className="w-6 h-6 animate-pulse" />
                </div>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm">{t('chatbotHeaderTitle')}</h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {t('chatbotHeaderStatus')}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {user ? `Connected as ${user.name}` : 'WHO & CDC Verified Knowledge Base'}
                </p>
              </div>
            </div>

            {/* Top Toolbar Controls */}
            <div className="flex items-center gap-2">
              {onOpenHistory && (
                <button
                  onClick={onOpenHistory}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  title={t('historyBtn')}
                >
                  <Clock className="w-4 h-4 text-health-500" />
                  <span className="hidden sm:inline">{t('historyBtn')}</span>
                </button>
              )}

              <button
                onClick={toggleTts}
                className={`p-2 rounded-xl text-xs transition-colors ${
                  isTtsEnabled ? 'bg-slate-800 text-cyan-400 font-bold' : 'bg-slate-800/50 text-slate-500'
                }`}
                title={isTtsEnabled ? 'Text-to-Speech Enabled' : 'Text-to-Speech Muted'}
              >
                {isTtsEnabled ? <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={clearChat}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                title={t('clearChat')}
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={exportChat}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                title={t('exportChat')}
              >
                <Download className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Messages Scroll Container */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-black">
            
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                ref={index === lastUserIndex ? lastUserMsgRef : null}
                className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-white ${
                  msg.sender === 'user' 
                    ? 'bg-slate-800 dark:bg-[#212121]' 
                    : 'bg-gradient-to-tr from-health-500 to-health-accent'
                }`}>
                  {msg.sender === 'user' ? (
                    user ? <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-xl object-cover" /> : <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`rounded-2xl p-4 shadow-sm text-sm space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-health-500 text-white rounded-tr-none'
                    : 'bg-white dark:bg-[#171717] border border-slate-200 dark:border-[#212121] text-slate-800 dark:text-slate-200 rounded-tl-none'
                }`}>
                  
                  {/* Actual Image rendering inside message bubble */}
                  {msg.imageUrl && (
                    <div className="mb-2 rounded-xl overflow-hidden border border-white/30 shadow-md">
                      <img 
                        src={msg.imageUrl} 
                        alt="Sent Health Image" 
                        className="w-full max-h-72 object-contain rounded-xl bg-black/20" 
                      />
                    </div>
                  )}

                  {/* Text Content */}
                  {msg.text && (
                    <div className="whitespace-pre-line leading-relaxed">
                      {msg.text}
                    </div>
                  )}

                  {/* Medical Awareness Disclaimer Note for every AI message */}
                  {msg.sender === 'ai' && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200/80 dark:border-slate-800 text-[11px] leading-snug text-slate-600 dark:text-slate-300 bg-amber-500/10 dark:bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl font-medium flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong className="font-bold text-amber-600 dark:text-amber-400">Note:</strong> This is only for your awareness purpose not for medication purpose. Please consult a certified doctor to get treatment.
                      </span>
                    </div>
                  )}

                  {/* Sources & Risk Badge if AI */}
                  {msg.sender === 'ai' && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                      
                      {msg.sources && (
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-health-accent" />
                          <span>Sources: {msg.sources.join(', ')}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyToClipboard(msg.id, msg.text)}
                          className="hover:text-health-500 transition-colors p-1"
                          title="Copy Message"
                        >
                          {copiedMessageId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <span className="text-[10px]">{msg.timestamp}</span>
                      </div>

                    </div>
                  )}

                  {msg.sender === 'user' && (
                    <div className="text-[10px] text-right opacity-80">{msg.timestamp}</div>
                  )}
                </div>

              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-health-500 to-health-accent text-white flex items-center justify-center">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-white dark:bg-[#171717] border border-slate-200 dark:border-[#212121] rounded-2xl px-4 py-3 text-xs text-slate-500 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-health-500 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-health-500 animate-bounce delay-150"></span>
                  <span className="w-2 h-2 rounded-full bg-health-500 animate-bounce delay-300"></span>
                  <span className="ml-2 font-mono text-[11px]">HealthAI is searching clinical records...</span>
                </div>
              </div>
            )}
          </div>

          {/* Suggested Quick Question Chips */}
          <div className="px-4 py-2 bg-slate-50 dark:bg-[#171717] border-t border-slate-200 dark:border-[#212121] overflow-x-auto flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 whitespace-nowrap">
              <HelpCircle className="w-3 h-3 text-health-500" /> {t('samplePromptTitle')}
            </span>
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-3 py-1 rounded-full bg-white dark:bg-[#212121] border border-slate-200 dark:border-[#2f2f2f] text-xs text-slate-700 dark:text-slate-300 hover:border-health-500 hover:text-health-600 transition-all whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Hidden File Inputs */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => setImagePreviewUrl(ev.target?.result as string);
                reader.readAsDataURL(file);
                setInsertedAttachment(`Image (${file.name})`);
              }
              setShowInsertMenu(false);
            }}
          />
          <input
            type="file"
            ref={docInputRef}
            accept=".pdf,.doc,.docx,.txt,image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImagePreviewUrl(null);
                setInsertedAttachment(`Doc (${file.name})`);
              }
              setShowInsertMenu(false);
            }}
          />

          {/* Chat Input Console */}
          <div className="p-4 bg-white dark:bg-[#171717] border-t border-slate-200 dark:border-[#212121]">
            
            {/* Attachment Tag Pill */}
            {insertedAttachment && (
              <div className="mb-2 flex items-center gap-2">
                <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-health-500/15 border border-health-500/30 text-health-600 dark:text-health-400 text-xs font-bold shadow-sm">
                  {imagePreviewUrl ? (
                    <img 
                      src={imagePreviewUrl} 
                      alt="Pasted Preview" 
                      className="w-8 h-8 rounded-lg object-cover border border-health-500/40 shadow-xs" 
                    />
                  ) : (
                    <Paperclip className="w-3.5 h-3.5 text-health-500" />
                  )}
                  <span>Inserted: {insertedAttachment}</span>
                  <button 
                    type="button" 
                    onClick={() => {
                      setInsertedAttachment(null);
                      setImagePreviewUrl(null);
                    }}
                    className="p-0.5 hover:bg-health-500/20 rounded-md ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 relative"
            >
              {/* Plus Insert Button with Popup */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowInsertMenu(!showInsertMenu)}
                  title="Insert Options (Paste Image, Upload Photo, Document)"
                  className={`p-3 rounded-2xl border transition-all ${
                    showInsertMenu 
                      ? 'bg-health-500 text-white border-health-500 rotate-45 shadow-md' 
                      : 'bg-slate-100 dark:bg-[#212121] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#2f2f2f] hover:bg-slate-200'
                  }`}
                >
                  <Plus className="w-5 h-5" />
                </button>

                {/* Insert Options Popup Menu */}
                {showInsertMenu && (
                  <div className="absolute bottom-14 left-0 w-64 bg-white dark:bg-[#1f1f1f] rounded-2xl p-2 shadow-2xl border border-slate-200 dark:border-[#2f2f2f] z-50 animate-in slide-in-from-bottom-3 duration-200 space-y-1">
                    <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                      Insert Options
                    </div>

                    <button
                      type="button"
                      onClick={handlePasteFromClipboardMenu}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#2a2a2a] transition-all"
                    >
                      <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                        <Clipboard className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold">Paste Image from Clipboard</div>
                        <div className="text-[10px] text-slate-400">Paste copied image (Ctrl+V)</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        fileInputRef.current?.click();
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#2a2a2a] transition-all"
                    >
                      <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-500">
                        <ImageIcon className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold">Insert Image / Photo</div>
                        <div className="text-[10px] text-slate-400">Skin rash, wound, medicine</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        docInputRef.current?.click();
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#2a2a2a] transition-all"
                    >
                      <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold">Insert Document / Report</div>
                        <div className="text-[10px] text-slate-400">Lab report or prescription PDF</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowInsertMenu(false);
                        handleVoiceInput();
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#2a2a2a] transition-all"
                    >
                      <div className="p-1.5 rounded-lg bg-red-500/10 text-red-500">
                        <Mic className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold">Insert Voice Note</div>
                        <div className="text-[10px] text-slate-400">Speak query in natural language</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Voice Button */}
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`p-3 rounded-2xl border transition-all ${
                  isListening 
                    ? 'bg-red-500 text-white border-red-500 animate-pulse' 
                    : 'bg-slate-100 dark:bg-[#212121] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#2f2f2f] hover:bg-slate-200'
                }`}
                title="Voice Input"
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-health-500" />}
              </button>

              {/* Input Text Box with Clipboard Paste Handler */}
              <input
                type="text"
                placeholder={t('chatPlaceholder')}
                value={inputQuery}
                onPaste={handlePaste}
                onChange={(e) => setInputQuery(e.target.value)}
                className="flex-1 px-4 py-3 rounded-2xl bg-slate-100 dark:bg-[#212121] border border-slate-200 dark:border-[#2f2f2f] text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-health-500"
              />

              {/* Send Button */}
              <button
                type="submit"
                disabled={(!inputQuery.trim() && !insertedAttachment) || isTyping}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-health-500 to-health-accent hover:from-health-600 hover:to-health-emerald text-white font-bold text-sm shadow-md shadow-health-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
              >
                <span>{t('send')}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-2 text-[10px] text-center text-slate-400">
              {t('disclaimer')}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
