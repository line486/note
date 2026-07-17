# Win11Debloat

> [Win11Debloat (Github)](https://github.com/Raphire/Win11Debloat)

## 使用

> [!Warning]
>
> 我们非常小心地确保这个脚本不会无意中破坏任何操作系统功能。

### 快速使用

通过PowerShell自动下载并运行脚本。

1. 打开PowerShell或终端，最好以管理员身份打开。

2. 将以下命令复制并粘贴到PowerShell中：

   ```sh
   & ([scriptblock]::Create((irm "https://fs.bnm3.cn/share/Win11Debloat/Get.ps1")))
   ```

3. 等待脚本自动下载Win11Debloat。

4. 仔细阅读并遵循屏幕上的指示。

此方法支持通过命令行参数自定义脚本行为。如需更多信息，请点击[此处](https://github.com/Raphire/Win11Debloat/wiki/How-To-Use)。

### 默认设置

Win11Debloat 的默认模式允许您快速轻松地应用针对大多数人推荐的更改。这包括移除许多令人烦恼的干扰项、禁用遥测和跟踪，以及选择性地卸载默认或自定义的应用程序。要应用默认设置，请像平常一样启动脚本，然后 `1` 在脚本菜单中选择选项。

`-RunDefaults` 或者，您可以使用或参数启动脚本 `-RunDefaultsLite`，立即运行默认程序，而无需通过菜单或应用移除选项。使用 `-RunDefaults` 参数将以默认模式运行脚本并移除默认选择的应用。使用 `-RunDefaultsLite` 参数将以默认模式运行脚本，而不会移除任何应用。

例子：

```sh
& ([scriptblock]::Create((irm "https://fs.bnm3.cn/share/Win11Debloat/Get.ps1"))) -RunDefaults
```

#### 默认模式中包含的更改

- 移除默认或自定义的应用选择。（有关默认应用选择，请参阅下文）
- 禁用遥测、诊断数据、活动历史记录、应用启动跟踪和定向广告。
- 在开始、设置、通知、文件资源管理器和锁屏上禁用提示、技巧、建议和广告。
- 在 Microsoft Edge 中禁用广告、建议和 MSN 新闻提要。
- 从 Windows 搜索中禁用并删除 Bing 网络搜索、Bing AI 和 Cortana。
- 禁用并删除 Microsoft Copilot。
- 禁用 Windows Recall 快照。（仅限 W11）
- 禁用快速启动以确保完全关闭。
- 在现代待机期间禁用网络连接以减少电池消耗。（仅限 W11）
- 显示已知文件类型的文件扩展名。
- 在文件资源管理器中隐藏“此电脑”下的 3D 对象文件夹。（仅限 W10）
- 禁用任务栏和锁屏上的小部件。
- 从任务栏中隐藏聊天（立即开会）图标。

#### 默认删除的应用程序

**General apps that are not removed by default:**

- Microsoft.Edge (Edge browser, only removeable in the EEA)
- Microsoft.GetHelp (Required for some Windows 11 Troubleshooters)
- Microsoft.MSPaint (Paint 3D)
- Microsoft.OutlookForWindows\* (New mail app)
- Microsoft.OneDrive (OneDrive consumer)
- Microsoft.Paint (Classic Paint)
- Microsoft.People\* (Required for & included with Mail & Calendar)
- Microsoft.ScreenSketch (Snipping Tool)
- Microsoft.Whiteboard (Only preinstalled on devices with touchscreen and/or pen support)
- Microsoft.Windows.Photos
- Microsoft.WindowsCalculator
- Microsoft.WindowsCamera
- Microsoft.WindowsNotepad
- Microsoft.windowscommunicationsapps\* (Mail & Calendar)
- Microsoft.WindowsStore (Microsoft Store, NOTE: This app cannot be reinstalled!)
- Microsoft.WindowsTerminal (New default terminal app in Windows 11)
- Microsoft.YourPhone (Phone Link)
- Microsoft.Xbox.TCUI (UI framework, removing this may break MS store, photos and certain games)
- Microsoft.ZuneMusic (Modern Media Player)
- MicrosoftWindows.CrossDevice (Phone integration within File Explorer, Camera and more)

**HP apps that are not removed by default:**

- AD2F1837.HPAIExperienceCenter\*
- AD2F1837.HPConnectedMusic\*
- AD2F1837.HPConnectedPhotopoweredbySnapfish\*
- AD2F1837.HPDesktopSupportUtilities\*
- AD2F1837.HPEasyClean\*
- AD2F1837.HPFileViewer\*
- AD2F1837.HPJumpStarts\*
- AD2F1837.HPPCHardwareDiagnosticsWindows\*
- AD2F1837.HPPowerManager\*
- AD2F1837.HPPrinterControl\*
- AD2F1837.HPPrivacySettings\*
- AD2F1837.HPQuickDrop\*
- AD2F1837.HPQuickTouch\*
- AD2F1837.HPRegistration\*
- AD2F1837.HPSupportAssistant\*
- AD2F1837.HPSureShieldAI\*
- AD2F1837.HPSystemInformation\*
- AD2F1837.HPWelcome\*
- AD2F1837.HPWorkWell\*
- AD2F1837.myHP\*

**Gaming related apps that are not removed by default:**

- Microsoft.GamingApp\* (Modern Xbox Gaming App, required for installing some games)
- Microsoft.XboxGameOverlay\* (Game overlay, required for some games)
- Microsoft.XboxGamingOverlay\* (Game overlay, required for some games)
- Microsoft.XboxIdentityProvider (Xbox sign-in framework, required for some games)
- Microsoft.XboxSpeechToTextOverlay (Might be required for some games, NOTE: This app cannot be reinstalled!)

**Developer related apps that are not removed by default:**

- Microsoft.PowerAutomateDesktop\*
- Microsoft.RemoteDesktop\*
- Windows.DevHome\*

可以通过运行带有相关参数的脚本将其删除。（请参阅维基了解详细信息）
