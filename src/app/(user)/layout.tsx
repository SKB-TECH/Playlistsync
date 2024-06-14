
import '../globals.css';
import {Providers} from "@/providers";
import ProviderThemes from "@/providers/ProviderThemes";
import {ProvidersState} from "@/settings/providers";

export const metadata = {
  title: "PlaylistSync",
  description: "Generated by oqpa",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressContentEditableWarning={true}>
      <body>
     
          <ProviderThemes>
              <ProvidersState>
                <Providers>
                    {children}
                </Providers>
              </ProvidersState>
          </ProviderThemes>
   
      </body>
    </html>
  )
}
