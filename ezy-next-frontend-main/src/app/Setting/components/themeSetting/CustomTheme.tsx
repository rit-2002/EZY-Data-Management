import { useTheme } from "../../../context/ThemeContext";

const CustomTheme = () => {
    const { primaryColor, secondaryColor, updatePrimaryColor, updateSecondaryColor } = useTheme()

    return (
        <table className="border-separate border-spacing-2">
            <tr>
                <td>
                    <label>Select Primary Color</label>
                </td>
                <td>
                </td>
                <td>
                    <div
                        className="w-6 h-6 rounded-full border border-gray-300 relative overflow-hidden"
                        style={{ backgroundColor: primaryColor }}>
                        <input
                            type="color"
                            value={primaryColor}
                            onChange={e => updatePrimaryColor(e.target.value)}
                            className="absolute -translate-x-1/4 -translate-y-1/4  h-10 w-10"
                        />
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <label>Select Secondary Color</label>
                </td>
                <td>
                </td>
                <td>
                    <div
                        className="w-6 h-6 rounded-full border border-gray-300 relative overflow-hidden"
                        style={{ backgroundColor: secondaryColor }}>
                        <input
                            type="color"
                            value={secondaryColor}
                            onChange={e => updateSecondaryColor(e.target.value)}
                            className="absolute -translate-x-1/4 -translate-y-1/4  h-10 w-10"
                        />
                    </div>
                </td>
            </tr>
        </table>
    )
}

export default CustomTheme