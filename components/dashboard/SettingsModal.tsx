import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useSettings, type SkillLevel } from "@/store/useSettings";
import { SUPPORTED_LANGUAGES } from "@/lib/constants";
import { getFlagForLanguage } from "@/app/lib/supportedFlags";
import Image from "next/image";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsModal = ({ open, onOpenChange }: SettingsModalProps) => {
  const { targetLanguage, skillLevel, setTargetLanguage, setSkillLevel } =
    useSettings();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-dark-gray border border-gray-four text-white">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label>Target Language</label>
            <Select value={targetLanguage} onValueChange={setTargetLanguage}>
              <SelectTrigger className="border border-gray-four">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-dark-gray-two border border-gray-four text-white">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex flex-row items-center gap-2">
                      <Image
                        src={
                          getFlagForLanguage(lang.name) ||
                          "/images/flags/british-flag.png"
                        }
                        alt={lang.name}
                        width={20}
                        height={20}
                      />
                      <p>{lang.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <label>Skill Level</label>
            <ToggleGroup
              type="single"
              value={skillLevel}
              onValueChange={(value) => setSkillLevel(value as SkillLevel)}
              className="w-full items-center justify-between"
            >
              <ToggleGroupItem value="beginner">Beginner</ToggleGroupItem>
              <ToggleGroupItem value="intermediate">
                Intermediate
              </ToggleGroupItem>
              <ToggleGroupItem value="advanced">Advanced</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
