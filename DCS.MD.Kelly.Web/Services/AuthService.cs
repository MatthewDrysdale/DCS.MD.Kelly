using Microsoft.JSInterop;

namespace DCS.MD.Kelly.Web.Services;

public class AuthService
{
    private readonly IJSRuntime _js;
    private const string Key = "app_auth";
    private const string CorrectPassword = "am";

    public bool IsAuthenticated { get; private set; }

    public AuthService(IJSRuntime js) => _js = js;

    public async Task InitialiseAsync()
    {
        var stored = await _js.InvokeAsync<string>("localStorage.getItem", Key);
        IsAuthenticated = stored == "true";
    }

    public async Task<bool> LoginAsync(string password)
    {
        if (password.Trim().ToLower() == CorrectPassword.ToLower())
        {
            IsAuthenticated = true;
            await _js.InvokeVoidAsync("localStorage.setItem", Key, "true");
            return true;
        }
        return false;
    }

    public async Task LogoutAsync()
    {
        IsAuthenticated = false;
        await _js.InvokeVoidAsync("localStorage.removeItem", Key);
    }
}